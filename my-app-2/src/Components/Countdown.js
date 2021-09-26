import React from 'react';
class CountDown extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerCount: 0,
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerCount: this.state.timerCount,
      timerStart: this.state.timerCount,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerCount - 10;
      console.log(`Time left is 🚀 ${newTime}`);
      if (newTime >= 0) {
        this.setState({
          timerCount: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert('Countdown ended');
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    clearInterval(this.timer);
    if (this.state.timerOn === false) {
      this.setState({
        timerCount: 0,
      });
    }
  };

  adjustTimer = (input) => {
    const { timerCount, timerOn } = this.state;
    if (!timerOn) {
      if (input === 'incHours' && timerCount + 3600000 < 216000000) {
        this.setState({ timerCount: timerCount + 3600000 });
      } else if (input === 'decHours' && timerCount - 3600000 >= 0) {
        this.setState({ timerCount: timerCount - 3600000 });
      } else if (input === 'incMinutes' && timerCount + 60000 < 216000000) {
        this.setState({ timerCount: timerCount + 60000 });
      } else if (input === 'decMinutes' && timerCount - 60000 >= 0) {
        this.setState({ timerCount: timerCount - 60000 });
      } else if (input === 'incSeconds' && timerCount + 1000 < 216000000) {
        this.setState({ timerCount: timerCount + 1000 });
      } else if (input === 'decSeconds' && timerCount - 1000 >= 0) {
        this.setState({ timerCount: timerCount - 1000 });
      }
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { timerCount, timerStart, timerOn } = this.state;
    let seconds = ('0' + (Math.floor((timerCount / 1000) % 60) % 60)).slice(-2);
    let minutes = ('0' + Math.floor((timerCount / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor((timerCount / 3600000) % 60)).slice(-2);

    return (
      <div>
        <h2>Countdown</h2>

        <div>
          <div className='flex'>
            <div>
              <h2>Hours</h2>
              <button onClick={() => this.adjustTimer('incHours')}>+</button>
              <h2>{hours}</h2>
              <button onClick={() => this.adjustTimer('decHours')}>-</button>
            </div>

            <div>
              <h2>Minutes</h2>
              <button onClick={() => this.adjustTimer('incMinutes')}>+</button>
              <h2>{minutes}</h2>
              <button onClick={() => this.adjustTimer('decMinutes')}>-</button>
            </div>

            <div>
              <h2>Seconds</h2>
              <button onClick={() => this.adjustTimer('incSeconds')}>+</button>
              <h2>{seconds}</h2>
              <button onClick={() => this.adjustTimer('decSeconds')}>-</button>
            </div>
          </div>

          <div>
            {timerOn === false &&
              (timerStart === 0 || timerCount === timerStart) && (
                <button onClick={this.startTimer}>Start</button>
              )}
            {timerOn === true && timerCount >= 1000 && (
              <button onClick={this.stopTimer}>Stop</button>
            )}
            {timerOn === false &&
              timerStart !== 0 &&
              timerStart !== timerCount &&
              timerCount !== 0 && (
                <button onClick={this.startTimer}>Resume</button>
              )}

            {(timerOn === false || timerCount < 1000) &&
              timerStart !== timerCount &&
              timerStart > 0 && (
                <button onClick={this.resetTimer}>Reset</button>
              )}
            <button onClick={this.props.handleClick}>STOP WATCH</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;
