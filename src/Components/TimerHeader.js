import React, {Component} from 'react'

class TimerHeader extends Component {
    constructor(props) {
        super(props);
        this.formatTime = this.formatTime.bind(this);
    }

    formatTime() {
        const minutes = Math.floor(this.props.minutes / 60);
        const remainderSeconds = this.props.minutes % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
        return display;
    }

    render() {
        return (
            <div>
            { this.props.inputToggle ? 
                <input className="timer timerInput" name="timeInput" placeholder={this.props.minutes} onChange={this.props.handleChange} autoFocus={true} />
                : <h1 className="timer" onClick={this.props.toggleInput}>{this.formatTime()}</h1>
            }
            </div>
        )
    }
}

export default TimerHeader