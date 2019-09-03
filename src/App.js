import React, { Component } from 'react';
import logo from './logo.svg';
import TimerHeader from './Components/TimerHeader'

class App extends Component {
  constructor(props) {
    super(props);
    let countdown;
    this.state = {
      minutes: 0,
      intervalId: countdown,
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
    document.addEventListener('mousedown', this.handleClickOutside);
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
    let mins = event.target.value || this.state.minutes
    console.log(mins);
    this.setState({minutes: mins, intervalId: undefined});
    this.startTimer(mins);
  }

  handleChange(event) {
    this.setState({minutes: event.target.value});
  }


  
  render() {
    return (
      <div className="App">
        <TimerHeader intervalId={this.state.intervalId} minutes={this.state.minutes} handleChange={this.handleChange}/>
        {this.quickTimers.map((time, i) => 
          <button key={i} onClick={this.handleSubmit} value={time}>{time} mins</button>
        )}
        <div>
          <button onClick={this.handleSubmit}>Start</button>
          <button>Stop</button>
          <button>Reset</button>
        </div>
      </div>
    )
  }
}

export default App;
