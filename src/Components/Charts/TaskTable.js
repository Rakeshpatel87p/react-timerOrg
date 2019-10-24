import React, { Component } from 'react';

class TaskTable extends Component {
    render() {
        const { data } = this.props 
        return (
            <div>
                <h2>All Sessions</h2>  
                <ul>
                    {Object.keys(data).map((item, i) => {
                        return <li key={i}>{`task: ${data[item].task} | time spend: ${data[item].sessionTime}`}</li>
                    })}
                </ul>
            </div>
        );
    }
}
 
export default TaskTable;