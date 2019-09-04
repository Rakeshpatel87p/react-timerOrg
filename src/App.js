import React, { Component } from 'react';
import logo from './logo.svg';
import TimerHeader from './Components/TimerHeader';
import TimeOperators from './Components/TimeOperators';

class App extends Component {
  constructor(props) {
    super(props);
    let countdown;
    this.state = {
      minutes: 0,
      intervalId: countdown,
      isTicking: false
    };
    this.quickTimers = [15, 25, 30];
    this.handleSubmit = this.handleSubmit.bind(this); //bind returns a copy of the function on which its invoked upon and allows us to set what the this value is
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
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
    this.setState({intervalId: this.countdown, isTicking: true})
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
    let mins = event.target.value || this.state.minutes
    console.log(mins);
    this.setState({minutes: mins, intervalId: undefined});
    this.startTimer(mins);
  }

  handleChange(event) {
    this.setState({minutes: event.target.value});
  }

  clearTimer() {
    clearInterval(this.state.intervalId);
    this.setState({minutes: 0, isTicking: false})
  }
  
  render() {
    return (
      <div className="App">
        <TimerHeader intervalId={this.state.intervalId} inputToggle={this.state.inputToggle} minutes={this.state.minutes} handleChange={this.handleChange}/>
        <div className="presetTimerBtns">
          {this.quickTimers.map((time, i) => 
            <button key={i} onClick={this.handleSubmit} value={time}>{time}</button>
          )}
        </div>
        <TimeOperators isTicking={this.state.isTicking} handleSubmit={this.handleSubmit} clearTimer={this.clearTimer}/>
      </div>
    )
  }
}

export default App;
