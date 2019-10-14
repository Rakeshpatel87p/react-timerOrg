import React, { Component } from 'react';
import { writeTaskDb, writeTaskDbSuccess, writeTaskDbFailure } from '../actions'
import { connect } from 'react-redux';

class TaskInput extends Component {

    render() {
        return (
            <div>
                {this.props.isTicking || this.props.currentTask ?
                    <div>
                        <h2>I'm <span>{this.props.currentTask}</span></h2>
                    </div>
                    :
                    <form onSubmit={this.props.writeTaskDb({"sessionTime" : 100, "task" : "test"})}> 
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

function mapDispatchToProps(dispatch) {
    return {
        writeTaskDb: (session) => dispatch(writeTaskDb(session)),
        writeTaskDbSuccess: () => dispatch(writeTaskDbSuccess()),
        writeTaskDbFailure: () => dispatch(writeTaskDbFailure())
    }
}

export default connect(null, mapDispatchToProps)(TaskInput);