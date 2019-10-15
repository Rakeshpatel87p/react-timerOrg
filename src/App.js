import React, { Component } from 'react';
import TimerHeader from './Components/TimerHeader';
import TimeOperators from './Components/TimeOperators';
import TaskInput from './Components/TaskInput';

import { connect } from 'react-redux'
import { isTicking } from './actions'
import { timedSessions } from './actions/timedSessions'

class App extends Component {
  constructor(props) {
    super(props);
    let countdown;
    this.state = {
      timedSession: 0,
      secondsRemaining: 0,
      intervalId: countdown,
      inputToggle: false,
      task: null

    };
    this.quickTimers = [15, 25, 30];
  }
  
  startTimer = (mins) => {
    clearInterval(this.state.intervalId);
    const now = Date.now();

    const then = now + mins * 1000
    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0) {
        //take entered task if exist
        //take countdown start
        //dispatch action to write sessionComplete to db
        clearInterval(this.countdown);
        this.props.dispatch(timedSessions({sessionTime: mins, task: 'test', timeStampStart: now}))
        return
      }
      this.setState({
        secondsRemaining: secondsLeft
      });
    }, 1000);
    this.setState({intervalId: this.countdown})
    this.props.dispatch(isTicking(true));
    //this.props.dispatch(timedSessions({sessionTime: mins, task: 'test', timeStampStart: 0}))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let mins = event.target.value * 60 || this.state.secondsRemaining;
    if (mins > 0) {
      this.setState({secondsRemaining: mins, intervalId: undefined, inputToggle: false});
      this.startTimer(mins);
    }
  }

  handleTaskSubmit = (event) => {
    event.preventDefault();
    let enteredTask = event.target.task.value;
    this.setState((prevState) => ({
        ...prevState,
        task: enteredTask
    }))
    event.target.task.value = '';
  }

  handleChange = (event) => {
    this.setState({secondsRemaining: event.target.value * 60});
  }

  clearTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({secondsRemaining: 0});
    this.props.dispatch(isTicking(false));
  }

  pauseTimer = () => {
    clearInterval(this.state.intervalId);
    this.props.dispatch(isTicking(false));
  }
  //Redux
  toggleInput = (event) => {
    this.setState({inputToggle: !this.state.inputToggle});
    this.props.dispatch(isTicking(false));
    clearInterval(this.props.intervalId);
  }

  bckgrdColorEffect = () => {
    //(secondsRemaining / countdownTime) * 249 - 249
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
          isTicking={this.props.isTicking} 
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

function mapStateToProps({clockStatus}) {
  return {
    isTicking: clockStatus.isTicking
  }
}

export default connect(mapStateToProps)(App);
