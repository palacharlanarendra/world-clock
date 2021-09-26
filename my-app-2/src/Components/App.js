import React from 'react';
import CountDown from './Countdown';
import Time from './Time';
import '../stylesheet/index.css';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: false,
    };
  }
  handleStart = () => {
    this.setState({
      value: !this.state.value,
    });
  };
  render() {
    return (
      <>
        {this.state.value ? (
          <Time handleClick={this.handleStart} />
        ) : (
          <CountDown handleClick={this.handleStart} />
        )}
      </>
    );
  }
}

export default App;
