import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 10
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  
  startTimer(event) {
    event.preventDefault();
    event.target.timeInput.value = '';
    const now = Date.now();
    const then = now + this.state.minutes * 60 * 1000;

    let countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0) {
        clearInterval(countdown);
        return
      }
      this.displayTimeLeft(secondsLeft);
    }, 1000);
    
  }

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;

    this.setState({
      minutes: display
    });
  }

  handleChange(event) {
    this.setState({minutes: event.target.value});
  }
  
  render() {
    return (
      <div className="App">
      <form onSubmit={this.startTimer}>
        <label>
          Enter Minutes For Countdown:
          <input name="timeInput" onChange={this.handleChange} type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <h1>{this.state.minutes}</h1>
      </div>
    )
  }
}

export default App;
