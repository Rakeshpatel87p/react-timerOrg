import React, { Component } from 'react';
import BarChart from './Charts/BarChart';

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
            }
          ];
          
          this.organizeData();
    }

    organizeData = () => {
        const sortedTasks = {};
        
        this.rawData.forEach((item) => {
            if (!Object.keys(sortedTasks).includes(item.task)) {
                sortedTasks[item.task] = {
                    "sessionTimes": ["Test1"],
                    "durations" : [item.sessionTime]
                }
            } else {
                sortedTasks[item.task] = {
                    ...sortedTasks[item.task],
                    durations: [...sortedTasks[item.task].durations, item.sessionTime]
                }
            }
        })

        console.log(sortedTasks)
    }
    
    render() {

        return (
            <div>
                {/*
                <BarChart 
                    title="Work Over Time"
                    color="#70CAD1"
                />
                */}
            </div>
        )
    }
}

export default UserStats