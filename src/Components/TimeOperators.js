import React, { Component } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps({isTicking}) {
    return {
        isTicking
    }
}

export default connect(mapStateToProps)(TimeOperators)