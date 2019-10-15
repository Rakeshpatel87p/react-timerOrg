import React, { Component } from 'react';
import BarChart from './Charts/BarChart';
import TaskTable from './Charts/TaskTable';
import { fetchTimedSessions, fetchTimedSessionsSuccess } from '../Actions/timedSessions';
import { connect } from 'react-redux';

class UserStats extends Component {
    constructor(props) {
        super(props);
        this.sortedTasks = {};
    }

    componentDidMount() {
        const { fetchTimedSessions } = this.props;
        const x = fetchTimedSessions()
        //console.log(x);
        //x.then((res) => console.log(res));
    }

    organizeData = (data) => {
        console.log(data);
        data.forEach((item) => {
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
                {(this.props.fetchObj.loading) ? 
                    <h2>Crunching the Numbers...</h2> :
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
                        />
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fetchObj: state.timedSessions,
        sessions: state.timedSessions.sessions
    }
}

function mapDispatchToProps(dispatch) {
    //clean data here
    return {
       fetchTimedSessions: () => {
           const data = dispatch(fetchTimedSessions());
           console.log(data);
           data.then((res) => console.log(res))
           return data
        },
       fetchTimedSessionsSuccess: () => {dispatch(fetchTimedSessionsSuccess())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStats)