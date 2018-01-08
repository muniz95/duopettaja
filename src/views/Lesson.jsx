import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar';
import CompoundQuestion from '../components/CompoundQuestion';
import GuessQuestion from '../components/GuessQuestion';
import { reachGoal } from '../actions';
import { connect } from 'react-redux';
import '../styles/Lesson.css';

class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      currentQuestionIndex: 0,
      questions: [],
      answers: [],
      correct: false,
      visibleAnswerBox: false,
      disabledCheckButton: false
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
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
            { id: 1, text: 'I', correct: true, selected: false },
            { id: 2, text: 'You', correct: false, selected: false },
            { id: 3, text: 'We', correct: false, selected: false },
            { id: 4, text: 'Me', correct: false, selected: false }
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
        <button
          disabled={this.state.disabledCheckButton}
          className="btn btn-default"
          onClick={this.checkAnswer}>
          Check
        </button>
        { this.state.visibleAnswerBox 
        ?
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 success-box">
              <span className="pull-left">Correct!</span>
              <button
                className="btn btn-primary pull-right"
                onClick={this.nextQuestion}>
                Next
              </button>
            </div>
          </div>
        :
          null
        }
      </div>
    );
  }
  
  checkAnswer() {
    const { currentQuestionIndex, questions, answers } = this.state;
    const currentQuestion = questions[currentQuestionIndex]
    const currentAnswer = answers[currentQuestionIndex]
    let progress
    if (currentQuestion.category === 'guess') {
      this.setState({ 
        correct: true,
        visibleAnswerBox: true,
        disabledCheckButton: true
      })
      progress = currentAnswer.correct 
      ? questions[currentQuestionIndex].weight
      : -(questions[currentQuestionIndex].weight)
    } else {
      // Check if there is any incorrect word
      const hasWrongWord = currentAnswer.map(x => x.correct).includes(false)
      if (hasWrongWord) {
        this.setState({ 
          correct: false,
          visibleAnswerBox: true,
          disabledCheckButton: true
        })
        progress = 0
      } else {
        // Check if the words are in the correct order
        if (this.orderedAnswers(currentAnswer.map(x => x.order))) {
          this.setState({ 
            correct: true,
            visibleAnswerBox: true,
            disabledCheckButton: true
          })
          progress = currentQuestion.weight
        } else {
          this.setState({
            correct: false,
            visibleAnswerBox: true,
            disabledCheckButton: true
          });
          progress = 0
        }
      }
    }
    this.setState({
      progress: this.state.progress + progress
    });
  }
  
  nextQuestion() {
    const { currentQuestionIndex, questions } = this.state;
    const nextStep = currentQuestionIndex + 1;
    if (nextStep < questions.length ) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        visibleAnswerBox: false,
        disabledCheckButton: false
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
