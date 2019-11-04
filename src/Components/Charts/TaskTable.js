import React, { Component } from 'react';

class TaskTable extends Component {
    render() {
        const { data } = this.props 
        return (
            <div>
                <h2>All Sessions</h2>  
                <ul>
                    {Object.keys(data).map((item) => {
                        const liItems = data[item].durations.map((duration, i) => {
                            return <li key={i}>{`task: ${item} | time spent: ${duration}`}</li>
                        })
                        return liItems
                        //return <li key={i}>{`task: ${item} | time spend: ${data[item].sessionTime}`}</li>
                    })}
                </ul>
            </div>
        );
    }
}
 
export default TaskTable;