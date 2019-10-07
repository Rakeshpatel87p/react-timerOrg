import React, { Component } from 'react';
import BarChart from './Charts/BarChart';
import TaskTable from './Charts/TaskTable';
import { fetchTimedSessions } from '../actions/timedSessions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserStats extends Component {
    constructor(props) {
        super(props);

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

    componentWillMount() {
        //const { fetchTimedSessions } = this.props;
        this.props.dispatch(fetchTimedSessions());
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
                <h1>How I'm Doing:</h1>
                <BarChart 
                    data={[{"data": [20, 30, 40]}]}
                    title="Work Over Time"
                    color="#70CAD1"
                    chartType="doughnut"
                    id="pieChart1"
                />
                <BarChart 
                    data={this.sortedTasks}
                    title="Work Over Time - Line"
                    color="#70CAD1"
                    chartType="line"
                    id="lineChart1"
                />
                <TaskTable 
                    data={this.rawData}
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    bindActionCreators({fetchTimedSessions}, dispatch)
}

export default connect(mapDispatchToProps)(UserStats)