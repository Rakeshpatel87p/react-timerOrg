import React, { Component } from 'react';
import logo from './logo.svg';
import TimerHeader from './Components/TimerHeader';
import TimeOperators from './Components/TimeOperators';
import TaskInput from './Components/TaskInput';

class App extends Component {
  constructor(props) {
    super(props);
    let countdown;
    this.state = {
      secondsRemaining: 0,
      intervalId: countdown,
      isTicking: false,
      inputToggle: false,
      taskEntered: false
    };
    this.quickTimers = [15, 25, 30];
    this.handleSubmit = this.handleSubmit.bind(this); //bind returns a copy of the function on which its invoked upon and allows us to set what the this value is
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.toggleTaskEntered = this.toggleTaskEntered.bind(this);
    this.bckgrdColorEffect = this.bckgrdColorEffect.bind(this);
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
        secondsRemaining: secondsLeft
      });
    }, 1000);
    this.setState({intervalId: this.countdown, isTicking: true})
  }

  handleSubmit(event) {
    event.preventDefault();
    let mins = event.target.value * 60 || this.state.secondsRemaining;
    if (mins > 0) {
      this.setState({secondsRemaining: mins, intervalId: undefined, inputToggle: false});
      this.startTimer(mins);
    }

  }

  handleChange(event) {
    this.setState({secondsRemaining: event.target.value * 60});
  }

  clearTimer() {
    clearInterval(this.state.intervalId);
    this.setState({secondsRemaining: 0, isTicking: false})
  }

  pauseTimer() {
    clearInterval(this.state.intervalId);
    this.setState({isTicking: false});
  }
  //Redux
  toggleInput(event) {
    this.setState({inputToggle: !this.state.inputToggle, isTicking: false});
    clearInterval(this.props.intervalId);
  }

  toggleTaskEntered() {
    this.setState({
      taskEntered: !this.state.taskEntered
    })
  }

  bckgrdColorEffect() {
    //(secondsRemaining / countdownTime) * 249 - 249
    const countdownTime = 15 * 60;
    const ratio = 249 - (((countdownTime - this.state.secondsRemaining + 1) / countdownTime) * 249);
    return {background: `rgb(${ratio}, 98, 71)`}
  }
  
  render() {
    return (
      <div className="App" style={this.bckgrdColorEffect()}>
        <TimerHeader 
          toggleInput={this.toggleInput} 
          intervalId={this.state.intervalId} 
          inputToggle={this.state.inputToggle} 
          secondsRemaining={this.state.secondsRemaining} 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
        />
        <div className="presetTimerBtns">
          {this.quickTimers.map((time, i) => 
            <button 
              className="circle" 
              key={i} onClick={(e) => this.handleSubmit(e, time)} 
              value={time}>{time}
            </button>
          )}
        </div>
        <TimeOperators 
          inputToggle={this.state.inputToggle} 
          isTicking={this.state.isTicking} 
          handleSubmit={this.handleSubmit} 
          clearTimer={this.clearTimer} 
          pauseTimer={this.pauseTimer}
        />
        <TaskInput 
          isTicking={this.state.isTicking}
          toggleTaskEntered={this.toggleTaskEntered}
        />
      </div>
    )
  }
}

export default App;
