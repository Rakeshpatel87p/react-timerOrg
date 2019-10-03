import React, { Component } from 'react';

class TaskTable extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <h2>All Sessions</h2>  
                <ul>
                    {this.props.data.map((item) => {
                        return <li>{`task: ${item.task} | time spend: ${item.sessionTime}`}</li>
                    })}
                </ul>
            </div>
        );
    }
}
 
export default TaskTable;