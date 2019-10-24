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
        data.forEach((item) => {
            if (!Object.keys(sortedTasks).includes(item.task)) {
                sortedTasks[item.task] = {
                    "sessionTimes": ["Test1"],
                    "durations" : [item.sessionTime]
                }
            } else {
                sortedTasks[item.task] = {
                    ...sortedTasks[item.task],
                    durations: [sortedTasks[item.task].durations, item.sessionTime]
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