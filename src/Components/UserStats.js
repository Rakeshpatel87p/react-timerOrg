import React, { Component } from 'react';
import BarChart from './Charts/BarChart';
import TaskTable from './Charts/TaskTable';
import { fetchTimedSessions } from '../Actions/timedSessions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserStats extends Component {

    componentDidMount() {
        const { fetchTimedSessions } = this.props;
        fetchTimedSessions()
    }

    organizeData = (data) => {
        const sortedTasks = {};
        Object.keys(data).forEach((item) => {
            if (!Object.keys(sortedTasks).includes(data[item].task)) {
                sortedTasks[data[item].task] = {
                    "sessionTimes": ["Test1"],
                    "durations" : [item.sessionTime]
                }
            } else {
                sortedTasks[data[item].task] = {
                    ...sortedTasks[data[item].task],
                    durations: [sortedTasks[data[item].task].durations, data[item].sessionTime]
                }
            }
        })
        return sortedTasks
    }

    render() {
        const {sessions} = this.props
        return (
            <div>
                {!sessions ? 
                    <h2>Crunching the Numbers...</h2> : 
                    (
                        <div>
                            <h1><Link to={'/'}><span>&#8592;</span></Link> How I'm Doing:</h1> 
                            <BarChart 
                                data={[{
                                    "data": Object.keys(sessions).map((sess) => sessions[sess].sessionTime)
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