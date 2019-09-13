import React, {Component} from 'react'

class TimerHeader extends Component {
    constructor(props) {
        super(props);
        this.formatTime = this.formatTime.bind(this);
    }

    formatTime() {
        const minutes = Math.floor(this.props.secondsRemaining / 60);
        const remainderSeconds = this.props.secondsRemaining % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
        return display;
    }

    render() {
        return (
            <div>
            { this.props.inputToggle ?
                <form onSubmit={(e) => this.props.handleSubmit(e)}> 
                    <input onClick={this.props.toggleInput} className="timer timerInput" name="timeInput" placeholder={this.formatTime()} onChange={this.props.handleChange} autoFocus={true} />
                </form> : 
                <h1 className="timer" onClick={this.props.toggleInput}>{this.formatTime()}</h1>
            }
            </div>
        )
    }
}

export default TimerHeader