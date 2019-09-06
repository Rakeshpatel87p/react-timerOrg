import React, { Component } from 'react';

class TimeOperators extends Component {
    
    render() {
        return (
            <div>
                {this.props.isTicking ? 
                    <button className="videoBtns" onClick={this.props.pauseTimer}>||</button> : 
                    <button className="videoBtns" onClick={this.props.handleSubmit}>&#9658;</button>
                }
                <button onClick={this.props.clearTimer}>Reset</button>
          </div>
        )
    }
}

export default TimeOperators