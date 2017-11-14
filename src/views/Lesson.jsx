import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar';
import CompoundQuestion from '../components/CompoundQuestion';
import GuessQuestion from '../components/GuessQuestion';

export default class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      currentQuestion: 0,
      questions: []
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }
  
  componentWillMount() {
    this.setState({
      questions: [
        {
          id: 1,
          category: 'guess',
          expression: 'Minä',
          options: [
            { text: 'I', correct: true },
            { text: 'You', correct: false },
            { text: 'We', correct: false },
            { text: 'Me', correct: false }
          ]
        },
        {
          id: 2,
          category: 'compound',
          expression: 'Minä olen mies',
          options: [
            { text: 'I', correct: true },
            { text: 'apple', correct: false },
            { text: 'go', correct: false },
            { text: 'am', correct: true },
            { text: 'a', correct: true },
            { text: 'an', correct: false },
            { text: 'man', correct: true }
          ]
        },
        {
          id: 3,
          category: 'guess',
          expression: 'Minä',
          options: [
            { text: 'I', correct: true },
            { text: 'You', correct: false },
            { text: 'We', correct: false },
            { text: 'Me', correct: false }
          ]
        }
      ]
    });    
  }
  
  render() {
    let question;
    console.log(this.state);

    switch (this.state.questions[this.state.currentQuestion].category) {
      case 'guess':
        question = <GuessQuestion
          question={this.state.questions[this.state.currentQuestion].expression}
          options={this.state.questions[this.state.currentQuestion].options}
        />
        break;
      case 'compound':
        question = <CompoundQuestion
          question={this.state.questions[this.state.currentQuestion].expression}
          options={this.state.questions[this.state.currentQuestion].options}
        />
        break;
    
      default:
        break;
    };

    return (
      <div>
        <ProgressBar progress={this.state.progress} />
        <h2>Lesson</h2>
        {question}
        <button className="btn btn-default" onClick={this.nextQuestion}>Make progress</button>
      </div>
    );
  }
  
  nextQuestion() {
    this.setState({
      progress: this.state.progress + 1,
      currentQuestion: this.state.currentQuestion + 1
    });
  }
}
