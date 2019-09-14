import React, { Component } from 'react';

class TaskInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }

        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    }
    
    handleTaskSubmit(event) {
        event.preventDefault();
        let task = event.target.task.value;
        this.setState((prevState) => ({
            tasks: [...prevState.tasks, {task}]
        }))
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleTaskSubmit}> 
                    <input 
                        autoFocus={true}
                        onChange={this.handleChange}
                        name="task" 
                    />
                </form>
            </div>
        )
    }
}

export default TaskInput;