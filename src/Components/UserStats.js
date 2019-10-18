import React, { Component } from 'react';
import BarChart from './Charts/BarChart';
import TaskTable from './Charts/TaskTable';
import { fetchTimedSessions } from '../Actions/timedSessions';
import { connect } from 'react-redux';

class UserStats extends Component {
    constructor(props) {
        super(props);
        this.sortedTasks = {};
    }

    componentDidMount() {
        const { fetchTimedSessions } = this.props;
        //updates state
        fetchTimedSessions()
    }

    organizeData = (data) => {

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
        return this.sortedTasks
    }

    render() {
        const {sessions} = this.props
        return (
            <div>
                {!sessions ? 
                    <h2>Crunching the Numbers...</h2> : 
                    (
                        <div>
                            <h1>How I'm Doing:</h1> 
                            <BarChart 
                                data={[{
                                    "data": sessions.map((sess) => sess.sessionTime)
                                }]}
                                title="Work Over Time"
                                color="#70CAD1"
                                chartType="doughnut"
                                id="pieChart1"
                            />
                            <BarChart 
                                data={this.organizeData(sessions)}
                                title="Work Over Time - Line"
                                color="#70CAD1"
                                chartType="line"
                                id="lineChart1"
                            />
                            <TaskTable
                                data={sessions}
                            />
                        </div>
                    )
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
       fetchTimedSessions: () => dispatch(fetchTimedSessions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStats)