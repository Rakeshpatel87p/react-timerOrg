import React, { Component } from 'react';

class TimeOperators extends Component {
    
    render() {
        return (
            <div>
                {this.props.isTicking ? 
                    <button className="videoBtns" onClick={this.props.pauseTimer}>||</button> : 
                    <button className="videoBtns" onClick={(e) => this.props.handleSubmit(e)}>&#9658;</button>
                }
                <button className="videoBtns" onClick={this.props.clearTimer}>&#8634;</button>
          </div>
        )
    }
}

export default TimeOperators