import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let countdown;
    this.state = {
      minutes: 0,
      intervalId: countdown
    };
    this.quickTimers = [15, 25, 30];
    this.handleSubmit = this.handleSubmit.bind(this); //bind returns a copy of the function on which its invoked upon and allows us to set what the this value is
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentDidMount() {
    clearInterval(this.state.intervalId);
  }
  
  startTimer(mins) {
    clearInterval(this.state.intervalId);
    const now = Date.now();

    const then = now + mins * 60 * 1000
    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0) {
        clearInterval(this.countdown);
        return
      }
      this.displayTimeLeft(secondsLeft);
    }, 1000);
    this.setState({intervalId: this.countdown})
  }

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;

    this.setState({
      minutes: display
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value)
    let mins = event.target.value
    //this.setState({minutes: event.target.timeInput.value, intervalId: undefined});
    this.setState({minutes: event.target.value, intervalId: undefined});
    this.startTimer(mins);
  }

  handleChange(event) {
    //this.setState({minutes: event.target.value});
  }
  
  render() {
    return (
      <div className="App">
        <h1>{this.state.minutes}</h1>
        {this.quickTimers.map((time) => 
          <button onClick={this.handleSubmit} value={time}>{time} mins</button>
        )}
        <form onSubmit={this.handleSubmit}>
        <label>
          Enter Minutes For Countdown:
          <input name="timeInput" value={this.state.minutes} onChange={this.handleChange} type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default App;
