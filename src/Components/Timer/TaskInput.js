import React, { Component } from 'react';

class TaskInput extends Component {

    render() {
        return (
            <div>
                {this.props.currentTask ?
                    <div>
                        <h2>I'm <span>{this.props.currentTask}</span></h2>
                    </div>
                    :
                    <form onSubmit={this.props.handleTaskSubmit}> 
                        <input 
                            autoFocus={true}
                            name="task" 
                            placeholder={'Enter Task Here'}
                        />
                    </form>
                }
            </div>
        )
    }
}

export default TaskInput;