import React, { Component } from 'react';
import BarChart from './Charts/BarChart';
import TaskTable from './Charts/TaskTable';
import { Link } from 'react-router-dom';

class UserStats extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchLocalStorage()
    }

    fetchLocalStorage = () => {
        const userData = JSON.parse(localStorage.getItem('timerTaskApp'));
        console.log(userData);
        this.setState({sessions: this.organizeData(userData)});
        console.log(this.state);
    }

    organizeData = (data) => {
        const sortedTasks = {};
        Object.keys(data).forEach((item) => {
            if (!Object.keys(sortedTasks).includes(data[item].task)) {
                sortedTasks[data[item].task] = {
                    "durations" : [data[item].timedSession],
                    "totalTime" : data[item].timedSession
                }
            } 
            
            else {
                let newDurations = [...sortedTasks[data[item].task].durations, data[item].timedSession];
                sortedTasks[data[item].task] = {
                    ...sortedTasks[data[item]],
                    durations: newDurations,
                    totalTime: newDurations.reduce((prev, current) => prev += current, 0)
                }
            }
            
        })
        return sortedTasks
    }

    render() {
        const {sessions} = this.state
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
                                data={sessions}
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

export default UserStats