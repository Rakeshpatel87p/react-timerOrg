import React, { Component } from 'react';
import TimerHeader from './Timer/TimerHeader';
import TimeOperators from './Timer/TimeOperators';
import TaskInput from './Timer/TaskInput';

import { connect } from 'react-redux';

import { writeTaskDb } from '../Actions/';

class TimerTaskApp extends Component {
  constructor(props) {
    super(props);
    let countdown;
    this.state = {
      timedSession: 0,
      secondsRemaining: 0,
      intervalId: countdown,
      inputToggle: false,
      task: null,
      isTicking: false

    };
    this.quickTimers = [15, 25, 30];
  }
  
  startTimer = (mins) => {
    clearInterval(this.state.intervalId);
    const now = Date.now();

    const then = now + mins * 1000
    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft === 0) {
        this.submitTaskToDb();
        this.clearTimer();
      }

      this.setState({
        secondsRemaining: secondsLeft
      });
    }, 1000);

    this.setState({timedSession: mins, intervalId: this.countdown, inputToggle: false, isTicking: true})
  }

  submitTaskToDb = () => {
    this.props.writeTaskDb({
      sessionTime: this.state.timedSession, 
      task: this.state.task
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let mins = event.target.value * 60 || this.state.secondsRemaining;
    if (mins > 0) {
      //Awkward UI result if waiting for startTimer to run
      this.setState({secondsRemaining: mins});
      this.startTimer(mins);
    }
  }

  handleTaskSubmit = (event) => {
    event.preventDefault();
    let enteredTask = event.target.task.value;
    this.setState({task: enteredTask})
    event.target.task.value = '';
  }

  handleChange = (event) => {
    this.setState({secondsRemaining: event.target.value * 60});
  }

  clearTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({secondsRemaining: 0, isTicking: false});
  }

  pauseTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({isTicking: false})
  }
  //Redux
  toggleInput = (event) => {
    this.setState({inputToggle: !this.state.inputToggle, isTicking: false});
    clearInterval(this.props.intervalId);
  }

  bckgrdColorEffect = () => {
    const countdownTime = 25 * 60;
    const origVal = 249;
    const ratio = origVal - (((countdownTime - this.state.secondsRemaining + 1) / countdownTime) * 249);
    return {background: `rgb(${ratio <= 0 ? origVal : ratio}, 98, 71)`}
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
          isTicking={this.state.isTicking} 
          handleSubmit={this.handleSubmit} 
          clearTimer={this.clearTimer} 
          pauseTimer={this.pauseTimer}
        />
        <TaskInput 
          handleTaskSubmit={this.handleTaskSubmit}
          currentTask={this.state.task}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    workSessions: state.response
  }
}

function mapDispatchToProps(dispatch) {
  return {
    writeTaskDb: (sessions) => dispatch(writeTaskDb(sessions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerTaskApp);
