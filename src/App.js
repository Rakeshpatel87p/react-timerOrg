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
      isTicking: false,
      inputToggle: false,
    };
    this.quickTimers = [15, 25, 30];
    this.handleSubmit = this.handleSubmit.bind(this); //bind returns a copy of the function on which its invoked upon and allows us to set what the this value is
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.enderTimerSound = new Audio('https://freesound.org/people/f-r-a-g-i-l-e/sounds/483449/');
    this.toggleInput = this.toggleInput.bind(this);
  }
  
  startTimer(mins) {
    clearInterval(this.state.intervalId);
    const now = Date.now();

    const then = now + mins * 1000
    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0) {
        clearInterval(this.countdown);
        return
      }
      this.setState({
        minutes: secondsLeft
      });
      if (secondsLeft === 0) {
        this.enderTimerSound.play();
      }
    }, 1000);
    this.setState({intervalId: this.countdown, isTicking: true})
  }

  handleSubmit(event) {
    event.preventDefault();
    let mins = event.target.value * 60 || this.state.minutes * 60;

    if (mins > 0) {
      this.setState({minutes: mins, intervalId: undefined, inputToggle: false});
      this.startTimer(mins);
    }

  }

  handleChange(event) {
    this.setState({minutes: event.target.value});
  }

  clearTimer() {
    clearInterval(this.state.intervalId);
    this.setState({minutes: 0, isTicking: false})
  }

  pauseTimer() {
    clearInterval(this.state.intervalId);
    this.setState({isTicking: false});
  }

  toggleInput(event) {
    console.log(event)
    this.setState({inputToggle: !this.state.inputToggle, isTicking: false});
    clearInterval(this.props.intervalId);
  }
  
  render() {
    return (
      <div className="App">
        <TimerHeader toggleInput={this.toggleInput} intervalId={this.state.intervalId} inputToggle={this.state.inputToggle} minutes={this.state.minutes} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <div className="presetTimerBtns">
          {this.quickTimers.map((time, i) => 
            <button className="circle" key={i} onClick={this.handleSubmit} value={time}>{time}</button>
          )}
        </div>
        <TimeOperators inputToggle={this.state.inputToggle} isTicking={this.state.isTicking} handleSubmit={this.handleSubmit} clearTimer={this.clearTimer} pauseTimer={this.pauseTimer}/>
      </div>
    )
  }
}

export default App;
