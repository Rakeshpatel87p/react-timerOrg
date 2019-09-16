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
        this.props.toggleTaskEntered();
        event.target.task.value = '';
    }

    render() {
        return (
            <div>
                {this.props.isTicking || this.props.taskEntered ?
                    <div>
                        <h2>I'm <span>{this.state.tasks[0].task}</span></h2>
                        <p>{this.props.taskEntered}</p>
                    </div>
                    :
                    <form onSubmit={this.handleTaskSubmit}> 
                        <input 
                            autoFocus={true}
                            onChange={this.handleChange}
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