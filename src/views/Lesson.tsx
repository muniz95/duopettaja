/* eslint-disable react/jsx-no-undef */
import React, { Component } from "react";
import CompoundQuestion from "../components/CompoundQuestion";
import GuessQuestion from "../components/GuessQuestion";
import Loading from "../components/Loading";
import ProgressBar from "../components/ProgressBar";
import { reachGoal } from "../redux/actions";
import { connect } from "react-redux";
import http from "../utils/http";
import "../styles/Lesson.css";
import Word from "../models/Word";
import Answer from "../models/Answer";

interface IProps {
  match: any;
  history: any;
  dispatchReachGoal: Function;
}

interface IState {
  progress: number;
  currentQuestionIndex: number;
  questions: Word[];
  answers: Answer[];
  correct: boolean;
  visibleAnswerBox: boolean;
  disabledCheckButton: boolean;
}

class Lesson extends Component<IProps, IState> {
  constructor (props: IProps) {
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

  componentDidMount (): void {
    const { id } = this.props.match.params;
    http
      .get(`${process.env.REACT_APP_API}/lessons/${id}/questions`)
      .then(response => {
        this.setState({questions: response.data});
      });
  }

  getAnswer (answer: Answer): void {
    const { currentQuestionIndex, answers } = this.state;
    answers[currentQuestionIndex] = answer;
    this.setState({answers});
  }

  render (): JSX.Element {
    if (this.state.questions.length) {
      let question: JSX.Element;

      switch (this.state.questions[this.state.currentQuestionIndex].category) {
        case "guess":
          question = <GuessQuestion
            question={this.state.questions[this.state.currentQuestionIndex].expression}
            options={this.state.questions[this.state.currentQuestionIndex].options}
            onChange={this.getAnswer}
          />;
          break;
        case "compound":
          question = <CompoundQuestion
            question={this.state.questions[this.state.currentQuestionIndex].expression}
            options={this.state.questions[this.state.currentQuestionIndex].options}
            onChange={this.getAnswer}
          />;
          break;
        default:
          question = <div></div>;
          break;
      }

      const btnNextQuestion: JSX.Element = this.state.visibleAnswerBox
        ? <div className="row">
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 success-box">
            <span className="pull-left">Correct!</span>
            <button
              className="btn btn-primary pull-right"
              onClick={this.nextQuestion}>
              Next
            </button>
          </div>
        </div>
        : <div></div>;

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
          {btnNextQuestion}
        </div>
      );
    } else {
      // this.props.history.goBack()
      return (
        <div>
          <Loading />
        </div>
      );
    }
  }

  checkAnswer (): void {
    const { currentQuestionIndex, questions, answers } = this.state;
    const currentQuestion: Word = questions[currentQuestionIndex];
    const currentAnswer: Answer = answers[currentQuestionIndex];
    let progress: number;
    if (currentQuestion.category === "guess") {
      this.setState({
        correct: true,
        visibleAnswerBox: true,
        disabledCheckButton: true
      });
      progress = (currentAnswer && currentAnswer.correct)
        ? questions[currentQuestionIndex].weight
        : -(questions[currentQuestionIndex].weight);
      questions[currentQuestionIndex].correct = currentAnswer.correct;
    } else {
      // check if there is any incorrect word
      const hasWrongWord: boolean = currentAnswer.options.map(x => x.correct).includes(false);
      if (hasWrongWord) {
        this.setState({
          correct: false,
          visibleAnswerBox: true,
          disabledCheckButton: true
        });
        progress = 0;
      } else {
        // check if the words are in the correct order
        if (this.orderedAnswers(currentAnswer.options.map(x => x.order))) {
          this.setState({
            correct: true,
            visibleAnswerBox: true,
            disabledCheckButton: true
          });
          progress = currentQuestion.weight;
          questions[currentQuestionIndex].correct = true;
        } else {
          this.setState({
            correct: false,
            visibleAnswerBox: true,
            disabledCheckButton: true
          });
          progress = 0;
          questions[currentQuestionIndex].correct = false;
        }
      }
    }
    this.setState({
      progress: this.state.progress + progress
    });
  }

  nextQuestion (): void {
    const { currentQuestionIndex, questions } = this.state;
    const { id } = this.props.match.params;
    const nextStep: number = currentQuestionIndex + 1;
    if (nextStep < questions.length) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        visibleAnswerBox: false,
        disabledCheckButton: false
      });
    } else {
      http.post(`${process.env.REACT_APP_API}/lessons/${id}`, {});
      this.props.dispatchReachGoal();
      this.props.history.push({
        pathname: "/lesson/finished",
        state: {
          questions: this.state.questions,
          lessonId: this.props.match.params.id
        }
      });
    }
  }

  orderedAnswers (a: any[], b: number = 0): boolean {
    let m: number = 0;
    let currentNum: number;
    let nextNum: number;
    let result: boolean = !!a;
    let test: boolean;
    if (a !== undefined) {
      if (a.constructor === Array) {
        result = true;
        while (m < a.length) {
          currentNum = a[m];
          nextNum = a[m + 1];
          if (typeof currentNum === "number" && typeof nextNum === "number") {
            if (b === 1) {
              test = currentNum <= nextNum;
            } else {
              test = currentNum >= nextNum;
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

const mapDispatchToProps = (dispatch: Function) => ({
  dispatchReachGoal: () => {
    dispatch(reachGoal());
  }
});

export default connect(null, mapDispatchToProps)(Lesson);
