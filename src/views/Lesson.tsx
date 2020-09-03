import { AxiosResponse } from "axios";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import CompoundQuestion from "../components/CompoundQuestion";
import GuessQuestion from "../components/GuessQuestion";
import Loading from "../components/Loading";
import ProgressBar from "../components/ProgressBar";
import Answer from "../models/Answer";
import Word from "../models/Word";
import actions from "../redux/actions";
import "../styles/Lesson.css";
import http from "../utils/http";

const Lesson = (props: RouteComponentProps) => {
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [correct, setCorrect] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [disabledCheckButton, setDisabledCheckButton] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [questions, setQuestions] = React.useState<Word[]>([]);
  const [visibleAnswerBox, setVisibleAnswerBox] = React.useState(false);
  const dispatch = useDispatch();
  const dispatchReachGoal = React.useCallback(
    () => dispatch(actions.reachGoal()),
    [dispatch]
  );

  React.useEffect(() => {
    const { id } = props.match.params as any;
    http
      .get(`${process.env.REACT_APP_API}/lessons/${id}/questions`)
      .then((response: AxiosResponse) => {
        setQuestions(response.data);
      });
  }, []);

  const getAnswer = (answer: any) => {
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
    setAnswers(answers);
  };

  const checkAnswer = () => {
    const currentQuestion: Word = questions[currentQuestionIndex];
    const currentAnswer: Answer = answers[currentQuestionIndex];
    let currentProgress: number;
    if (currentQuestion.category === "guess") {
      setCorrect(true);
      setDisabledCheckButton(true);
      setVisibleAnswerBox(true);
      currentProgress = currentAnswer.correct
          ? questions[currentQuestionIndex].weight
          : -questions[currentQuestionIndex].weight;
      questions[currentQuestionIndex].correct = currentAnswer.correct;
    } else {
      // check if there is any incorrect word
      const hasWrongWord: boolean = currentAnswer.options
        .map((x: Answer) => x.correct)
        .includes(false);
      if (hasWrongWord) {
        setCorrect(false);
        setDisabledCheckButton(true);
        setVisibleAnswerBox(true);
        currentProgress = 0;
      } else {
        // check if the words are in the correct order
        if (orderedAnswers(currentAnswer.options.map((x: Answer) => x.order))) {
          setCorrect(true);
          setDisabledCheckButton(true);
          setVisibleAnswerBox(true);
          currentProgress = currentQuestion.weight;
          questions[currentQuestionIndex].correct = true;
        } else {
          setCorrect(false);
          setDisabledCheckButton(true);
          setVisibleAnswerBox(true);
          currentProgress = 0;
          questions[currentQuestionIndex].correct = false;
        }
      }
    }
    setProgress(progress + currentProgress);
  };

  const nextQuestion = () => {
    const { id } = props.match.params as any;
    const nextStep: number = currentQuestionIndex + 1;
    if (nextStep < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setDisabledCheckButton(false);
      setVisibleAnswerBox(false);
    } else {
      http.post(`${process.env.REACT_APP_API}/lessons/${id}`, {});
      dispatchReachGoal();
      props.history.push({
        pathname: "/lesson/finished",
        state: {
          lessonId: (props.match.params as any).id,
          questions: questions,
        },
      });
    }
  };

  const orderedAnswers = (a: any[], b: number = 0): boolean => {
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
  };

  if (questions.length) {
    let question: JSX.Element;

    switch (questions[currentQuestionIndex].category) {
      case "guess":
        question = (
          <GuessQuestion
            question={questions[currentQuestionIndex].expression}
            options={questions[currentQuestionIndex].options}
            onChange={getAnswer}
          />
        );
        break;
      case "compound":
        question = (
          <CompoundQuestion
            question={questions[currentQuestionIndex].expression}
            options={questions[currentQuestionIndex].options}
            onChange={getAnswer}
          />
        );
        break;
      default:
        question = <div></div>;
        break;
    }

    const btnNextQuestion: JSX.Element = visibleAnswerBox ? (
      <div className="row">
        <div>
          <span className="pull-left">Correct!</span>
          <button className="btn btn-primary pull-right" onClick={nextQuestion}>
            Next
          </button>
        </div>
      </div>
    ) : (
      <div></div>
    );

    return (
      <div>
        <ProgressBar progress={progress} />
        <h2>Lesson</h2>
        {question}
        <button
          disabled={disabledCheckButton}
          className="btn btn-default"
          onClick={checkAnswer}
        >
          Check
        </button>
        {btnNextQuestion}
      </div>
    );
  } else {
    // props.history.goBack()
    return (
      <div>
        <Loading />
      </div>
    );
  }
};

export default Lesson;
