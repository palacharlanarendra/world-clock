import React from 'react';
class Time extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: '00',
      minutes: '00',
      hours: '00',
      startTimer: false,
      resumeTimer: false,
    };
    this.timer = null;
  }
  startTimer = () => {
    this.setState((prevState) => ({
      startTimer: true,
    }));
    this.timer = setInterval(() => {
      if (Number(this.state.seconds) <= 60) {
        this.setState((prevState) => ({
          seconds: Number(prevState.seconds) + 1,
        }));
      }
      if (Number(this.state.seconds) >= 60) {
        this.setState((prevState) => ({
          seconds: '00',
        }));
      }
      if (
        Number(this.state.minutes) < 60 &&
        Number(this.state.seconds) === 59
      ) {
        this.setState((prevState) => ({
          minutes: Number(prevState.minutes) + 1,
        }));
      }
      if (Number(this.state.minutes) >= 60) {
        this.setState((prevState) => ({
          minutes: '00',
        }));
      }
      if (
        Number(this.state.seconds) === 59 &&
        Number(this.state.minutes) === 59 &&
        Number(this.state.hours <= 24)
      ) {
        this.setState((prevState) => ({
          hours: Number(prevState.hours) + 1,
        }));
      }

      console.log('time is running');
    }, 15);
  };
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({
      resumeTimer: !this.state.resumeTimer,
    });
  };
  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      seconds: '00',
      minutes: '00',
      hours: '00',
      startTimer: false,
      resumeTimer: false,
    });
  };
  componentWillUnmount = () => {
    clearInterval(this.timer);
  };
  render() {
    return (
      <>
        <h2>STOP WATCH</h2>
        <h2>
          {this.state.hours} hours:{this.state.minutes} minutes :
          {this.state.seconds} seconds
        </h2>

        {this.state.resumeTimer ? (
          <button onClick={this.startTimer}>resume</button>
        ) : (
          <button onClick={this.startTimer}>start</button>
        )}

        {this.state.startTimer ? (
          <button onClick={this.stopTimer}>stop</button>
        ) : (
          ''
        )}
        {this.state.startTimer ? (
          <button onClick={this.resetTimer}>reset</button>
        ) : (
          ''
        )}

        <button onClick={this.props.handleClick}>COUNT DOWN</button>
      </>
    );
  }
}
export default Time;
