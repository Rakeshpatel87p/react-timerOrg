import React, { Component } from 'react';
import TimerHeader from './Timer/TimerHeader';
import TimeOperators from './Timer/TimeOperators';
import TaskInput from './Timer/TaskInput';
import LoginBar from './Login/LoginBar';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

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
      isTicking: false,
      localStoragePresent: false

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
    //check to see if localStorage info exists
    const itemEntry = 'timerTaskApp';
    const { timedSession, task } = this.state;
    const localStorageSess = localStorage.getItem(itemEntry)
    
    if (localStorageSess) {
      const dataParsed = JSON.parse(localStorageSess);
      const dataUpdated = [...dataParsed, {timedSession, task}]
      localStorage.setItem(itemEntry, JSON.stringify(dataUpdated));
      this.setState({localStoragePresent: true});
    } else {
      const dataToStore = JSON.stringify([{timedSession, task}]);
      localStorage.setItem(itemEntry, dataToStore);
    }
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
  
  render() {
    return (
      <div className="App">
        {this.state.localStoragePresent &&  <Link to={'/myStats'}>My Stats</Link>}
       
        <LoginBar />
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

export default connect(mapStateToProps)(TimerTaskApp);
