import React, { Component } from 'react';
import BarChart from './Charts/BarChart';
import TaskTable from './Charts/TaskTable'

class UserStats extends Component {
    constructor(props) {
        super(props);
        //{sessionTime: mins, task: 'test', timeStampStart: 0}
        this.rawData = [
            {
              "sessionTime" : 20,
              "task" : "coding",
            },
            {
                "sessionTime" : 30,
                "task" : "coding"
            },
            {
                "sessionTime" : 40,
                "task" : "coding"
            },
            {
                "sessionTime" : 60,
                "task" : "coding"
            },
            {
                "sessionTime": 10,
                "task": "cooking"
            },
            {
                "sessionTime": 30,
                "task": "cooking"
            }
          ];
          this.sortedTasks = {};
          this.organizeData();
    }

    organizeData = () => {
        this.rawData.forEach((item) => {
            if (!Object.keys(this.sortedTasks).includes(item.task)) {
                this.sortedTasks[item.task] = {
                    "sessionTimes": ["Test1"],
                    "durations" : [item.sessionTime]
                }
            } else {
                this.sortedTasks[item.task] = {
                    ...this.sortedTasks[item.task],
                    durations: [...this.sortedTasks[item.task].durations, item.sessionTime]
                }
            }
        })
    }

    render() {

        return (
            <div>
                
                <BarChart 
                    data={this.sortedTasks}
                    title="Work Over Time"
                    color="#70CAD1"
                    type="line"
                />
                <BarChart 
                    data={[{"data": [20, 30, 40]}]}
                    title="Work Over Time"
                    color="#70CAD1"
                    type="pie"
                />
                <TaskTable 
                    data={this.rawData}
                />
            </div>
        )
    }
}

export default UserStats