import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar';

export default class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
    this.increaseProgress = this.increaseProgress.bind(this);
  }
  
  render() {
    return (
      <div>
        <ProgressBar progress={this.state.progress} />
        <h2>Lesson</h2>
        <button className="btn btn-default" onClick={this.increaseProgress}>Make progress</button>
      </div>
    );
  }
  
  increaseProgress() {
    this.setState({progress: this.state.progress + 1});
  }
}
