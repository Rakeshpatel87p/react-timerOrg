import React, { Component } from 'react';

class TaskTable extends Component {
    render() { 
        return (
            <div>
                <h2>All Sessions</h2>  
                <ul>
                    {this.props.data.map((item, i) => {
                        return <li key={i}>{`task: ${item.task} | time spend: ${item.sessionTime}`}</li>
                    })}
                </ul>
            </div>
        );
    }
}
 
export default TaskTable;