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
      currentQuestionIndex: 0,
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
            { id: 1, text: 'I', correct: true, order: 1 },
            { id: 2, text: 'apple', correct: false, order: 0 },
            { id: 3, text: 'go', correct: false, order: 0 },
            { id: 4, text: 'am', correct: true, order: 2 },
            { id: 5, text: 'a', correct: true, order: 3 },
            { id: 6, text: 'an', correct: false, order: 0 },
            { id: 7, text: 'man', correct: true, order: 4 }
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
    const { currentQuestionIndex, answers } = this.state;
    answers[currentQuestionIndex] = answer;
    this.setState(answers);
  }
  
  render() {
    let question;

    switch (this.state.questions[this.state.currentQuestionIndex].category) {
      case 'guess':
        question = <GuessQuestion
          question={this.state.questions[this.state.currentQuestionIndex].expression}
          options={this.state.questions[this.state.currentQuestionIndex].options}
          onChange={this.getAnswer}
        />
        break;
      case 'compound':
        question = <CompoundQuestion
          question={this.state.questions[this.state.currentQuestionIndex].expression}
          options={this.state.questions[this.state.currentQuestionIndex].options}
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
    const { currentQuestionIndex, questions, answers } = this.state;
    const nextStep = currentQuestionIndex + 1;
    const currentQuestion = questions[currentQuestionIndex]
    const currentAnswer = answers[currentQuestionIndex]
    let progress
    if (currentQuestion.category === 'guess') {
      progress = currentAnswer.correct 
      ? questions[currentQuestionIndex].weight
      : -(questions[currentQuestionIndex].weight)
    } else {
      // Check if there is any incorrect word
      const hasWrongWord = currentAnswer.map(x => x.correct).includes(false)
      if (hasWrongWord) {
        progress = 0
      } else {
        // Check if the words are in the correct order
        if (this.orderedAnswers(currentAnswer.map(x => x.order))) {
          progress = currentQuestion.weight
        } else {
          progress = 0
        }
      }
    }
    this.setState({
      progress: this.state.progress + progress
    });
    if (nextStep < questions.length ) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1
      });
    } else {
      alert('Done');
      this.props.dispatchReachGoal();
    }
  }

  orderedAnswers(a, b) {
    let m = 0;
    let current_num;
    let next_num;
    let result = a;
    let test;
    if (a !== undefined) {
      if (a.constructor === Array) {
        result = true;
        while (m < a.length) {
          current_num = a[m];
          next_num = a[m + 1];
          if (typeof current_num === "number" && typeof next_num === "number") {
            if (b === 1) {
              test = current_num <= next_num;
            } else {
              test = current_num >= next_num; 
            }
            if (test) {
              
              result = false;
              break;
            }
          }
          m += 1;
        }
      }
    }
    return result;
  }
}


const mapDispatchToProps = (dispatch) => ({
  dispatchReachGoal: () => {
    dispatch(reachGoal())
  }
})

export default connect(null, mapDispatchToProps)(Lesson);
