import React, {Component} from 'react'

class TimerHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputToggle: false
        };
        this.toggleInput = this.toggleInput.bind(this);
    }

    toggleInput() {
        this.setState({inputToggle: !this.state.inputToggle});
        clearInterval(this.props.intervalId);
    }

    render() {
        return (
            <div>
            { this.state.inputToggle ? 
                <input name="timeInput" placeholder={this.props.minutes} value={this.props.minutes} onChange={this.props.handleChange} type="text" />
                : <h1 className="timer" onClick={this.toggleInput}>{this.props.minutes}</h1>
            }
            </div>
        )
    }
}

export default TimerHeader