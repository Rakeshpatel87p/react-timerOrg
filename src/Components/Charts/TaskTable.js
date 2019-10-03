import React, { Component } from 'react';

class TaskTable extends Component {
    state = {  }
    render() { 
        return (  
            <ul>
                {this.props.data.map((item) => {
                    return <li>{`task: ${item.task} | time spend: ${item.sessionTime}`}</li>
                })}
            </ul>
        );
    }
}
 
export default TaskTable;