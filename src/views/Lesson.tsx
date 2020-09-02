import { AxiosResponse } from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import CompoundQuestion from "../components/CompoundQuestion";
import GuessQuestion from "../components/GuessQuestion";
import Loading from "../components/Loading";
import ProgressBar from "../components/ProgressBar";
import Answer from "../models/Answer";
import Word from "../models/Word";
import { reachGoal } from "../redux/actions";
import "../styles/Lesson.css";
import http from "../utils/http";

interface IProps extends RouteComponentProps<any> {
  dispatchReachGoal: () => void;
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

const Lesson = (props: RouteComponentProps) => {
  // constructor(props: IProps) {
  //   super(props);
  //   this.state = {
  //     answers: [],
  //     correct: false,
  //     currentQuestionIndex: 0,
  //     disabledCheckButton: false,
  //     progress: 0,
  //     questions: [],
  //     visibleAnswerBox: false,
  //   };

  //   this.nextQuestion = this.nextQuestion.bind(this);
  //   this.checkAnswer = this.checkAnswer.bind(this);
  //   this.getAnswer = this.getAnswer.bind(this);
  // }

  React.useEffect(() => {
    const { id } = props.match.params as any;
    http
      .get(`${process.env.REACT_APP_API}/lessons/${id}/questions`)
      .then((response: AxiosResponse) => {
        this.setState({questions: response.data});
      });
  }, [])

  const getAnswer = (answer: Answer) => {
    const { questions, currentQuestionIndex, answers } = this.state;
    if (questions[currentQuestionIndex].category === "compound") {
      let currentAnswer: Answer = answers[currentQuestionIndex];
      if (currentAnswer === undefined) {
        currentAnswer = new Answer();
      }
      currentAnswer.options.push(answer);
      answers[currentQuestionIndex] = currentAnswer;
    } else {
      answers[currentQuestionIndex] = answer;
    }
    this.setState({answers});
  }

  public render(): JSX.Element {
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
            <div>
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

  public checkAnswer() => {
    const { currentQuestionIndex, questions, answers } = this.state;
    const currentQuestion: Word = questions[currentQuestionIndex];
    const currentAnswer: Answer = answers[currentQuestionIndex];
    let progress: number;
    if (currentQuestion.category === "guess") {
      this.setState({
        correct: true,
        disabledCheckButton: true,
        visibleAnswerBox: true,
      });
      progress = (currentAnswer && currentAnswer.correct)
        ? questions[currentQuestionIndex].weight
        : -(questions[currentQuestionIndex].weight);
      questions[currentQuestionIndex].correct = currentAnswer.correct;
    } else {
      // check if there is any incorrect word
      const hasWrongWord: boolean = currentAnswer.options.map((x: Answer) => x.correct).includes(false);
      if (hasWrongWord) {
        this.setState({
          correct: false,
          disabledCheckButton: true,
          visibleAnswerBox: true,
        });
        progress = 0;
      } else {
        // check if the words are in the correct order
        if (this.orderedAnswers(currentAnswer.options.map((x: Answer) => x.order))) {
          this.setState({
            correct: true,
            disabledCheckButton: true,
            visibleAnswerBox: true,
          });
          progress = currentQuestion.weight;
          questions[currentQuestionIndex].correct = true;
        } else {
          this.setState({
            correct: false,
            disabledCheckButton: true,
            visibleAnswerBox: true,
          });
          progress = 0;
          questions[currentQuestionIndex].correct = false;
        }
      }
    }
    this.setState({
      progress: this.state.progress + progress,
    });
  }

  public nextQuestion() => {
    const { currentQuestionIndex, questions } = this.state;
    const { id } = this.props.match.params;
    const nextStep: number = currentQuestionIndex + 1;
    if (nextStep < questions.length) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        disabledCheckButton: false,
        visibleAnswerBox: false,
      });
    } else {
      http.post(`${process.env.REACT_APP_API}/lessons/${id}`, {});
      this.props.dispatchReachGoal();
      this.props.history.push({
        pathname: "/lesson/finished",
        state: {
          lessonId: this.props.match.params.id,
          questions: this.state.questions,
        },
      });
    }
  }

  public orderedAnswers(a: any[], b: number = 0): boolean {
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

const mapDispatchToProps = {
  dispatchReachGoal: reachGoal,
};

export default Lesson;
