import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar';
import CompoundQuestion from '../components/CompoundQuestion';
import GuessQuestion from '../components/GuessQuestion';
import { reachGoal } from '../actions';
import { connect } from 'react-redux';

class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      currentQuestion: 0,
      questions: [],
      answers: []
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
  }
  
  componentWillMount() {
    this.setState({
      questions: [
        {
          id: 1,
          category: 'guess',
          expression: 'Minä',
          options: [
            { id: 1, text: 'I', correct: true },
            { id: 2, text: 'You', correct: false },
            { id: 3, text: 'We', correct: false },
            { id: 4, text: 'Me', correct: false }
          ],
          weight: 33
        },
        {
          id: 2,
          category: 'compound',
          expression: 'Minä olen mies',
          options: [
            { id: 1, text: 'I', correct: true },
            { id: 2, text: 'apple', correct: false },
            { id: 3, text: 'go', correct: false },
            { id: 4, text: 'am', correct: true },
            { id: 5, text: 'a', correct: true },
            { id: 6, text: 'an', correct: false },
            { id: 7, text: 'man', correct: true }
          ],
          weight: 33
        },
        {
          id: 3,
          category: 'guess',
          expression: 'Minä',
          options: [
            { id: 1, text: 'I', correct: true },
            { id: 2, text: 'You', correct: false },
            { id: 3, text: 'We', correct: false },
            { id: 4, text: 'Me', correct: false }
          ],
          weight: 34
        }
      ]
    });    
  }

  getAnswer(answer) {
    const { currentQuestion, answers } = this.state;
    answers[currentQuestion] = answer;
    this.setState(answers);
  }
  
  render() {
    let question;

    switch (this.state.questions[this.state.currentQuestion].category) {
      case 'guess':
        question = <GuessQuestion
          question={this.state.questions[this.state.currentQuestion].expression}
          options={this.state.questions[this.state.currentQuestion].options}
          onChange={this.getAnswer}
        />
        break;
      case 'compound':
        question = <CompoundQuestion
          question={this.state.questions[this.state.currentQuestion].expression}
          options={this.state.questions[this.state.currentQuestion].options}
          onChange={this.getAnswer}
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
    const { currentQuestion, questions, answers } = this.state;
    const nextStep = currentQuestion + 1;
    const progress = answers[currentQuestion].correct 
    ? questions[currentQuestion].weight
    : -(questions[currentQuestion].weight)
    console.log('answers', answers);
    this.setState({
      progress: this.state.progress + progress
    });
    if (nextStep < questions.length ) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      });
    } else {
      alert('Done');
      this.props.dispatchReachGoal();
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchReachGoal: () => {
    dispatch(reachGoal())
  }
})

export default connect(null, mapDispatchToProps)(Lesson);
