import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 10
    }
  }
  
  startTimer() {
    const now = Date.now();
    const then = now + this.state.minutes * 60 * 1000;

    let countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0) {
        clearInterval(countdown);
        return
      }
      this.setState({
        seconds: secondsLeft
      })
    }, 1000);
    
  }

  componentDidMount() {
    this.startTimer()
  }
  
  render() {
    return (
      <div className="App">
        <h1>{this.state.minutes}</h1>
      </div>
    )
  }
}

export default App;
