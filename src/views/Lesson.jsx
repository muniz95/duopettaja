import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar';
import CompoundQuestion from '../components/CompoundQuestion';
import GuessQuestion from '../components/GuessQuestion';
import { reachGoal } from '../actions';
import { connect } from 'react-redux';
import http from '../utils/http'
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
    console.log('recebido de Skills: ', props)

    this.nextQuestion = this.nextQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
  }
  
  componentDidMount(props) {
    const { id } = this.props.match.params
    http
      .get(`http://localhost:8081/lessons/${id}/questions`)
      .then(response => {
        console.log(response.data)
        this.setState({questions: response.data})
      })
  }
    
    getAnswer(answer) {
      const { currentQuestionIndex, answers } = this.state;
      answers[currentQuestionIndex] = answer;
      this.setState(answers);
  }
    
  render() {
    if (this.state.questions.length) {
      let question;

      switch (this.state.questions[this.state.currentQuestionIndex].category) {
        case 'guess':
          question = <GuessQuestion
            question={this.state.questions[this.state.currentQuestionIndex].expression}
            options={this.state.questions[this.state.currentQuestionIndex].question_options}
            onChange={this.getAnswer}
          />
          break;
        case 'compound':
          question = <CompoundQuestion
            question={this.state.questions[this.state.currentQuestionIndex].expression}
            options={this.state.questions[this.state.currentQuestionIndex].question_options}
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
    } else {
      // this.props.history.goBack();
      return (
        <div>
          Carregando...
        </div>
      )
    }
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
      questions[currentQuestionIndex].correct = currentAnswer.correct
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
          questions[currentQuestionIndex].correct = true
        } else {
          this.setState({
            correct: false,
            visibleAnswerBox: true,
            disabledCheckButton: true
          });
          progress = 0
          questions[currentQuestionIndex].correct = false
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
      this.props.dispatchReachGoal();
      this.props.history.push({
        pathname: '/lesson/finished',
        state: {
          questions: this.state.questions
        }
      });
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
