import React, { Component } from 'react';

class TimeOperators extends Component {
    
    render() {
        return (
            <div>
                {this.props.isTicking ? 
                    <button onClick={this.props.pauseTimer}>Pause</button> : 
                    <button onClick={this.props.handleSubmit}>Start</button>
                }
                <button onClick={this.props.clearTimer}>Reset</button>
          </div>
        )
    }
}

export default TimeOperators