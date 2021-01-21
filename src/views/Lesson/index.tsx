import { AxiosResponse } from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { isIdentifier } from "typescript";
import CompoundQuestion from "../../components/CompoundQuestion";
import GuessQuestion from "../../components/GuessQuestion";
import Loading from "../../components/Loading";
import ProgressBar from "../../components/ProgressBar";
import Answer from "../../models/Answer";
import Word from "../../models/Word";
import actions from "../../redux/actions";
import http from "../../utils/http";
import * as S from './styled';

const Lesson = (props: RouteComponentProps) => {
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [isCorrect, setCorrect] = React.useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [disabledCheckButton, setDisabledCheckButton] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [questions, setQuestions] = React.useState<Word[]>([]);
  const [visibleAnswerBox, setVisibleAnswerBox] = React.useState(false);
  const isButtonDisabled = () => disabledCheckButton && !answers.length;
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
  }, [props.match.params]);

  const getAnswer = (answer: any) => {
    if (questions[currentQuestionIndex].category === "compound") {
      let currentAnswer: Answer = answers[currentQuestionIndex];
      if (currentAnswer === undefined) {
        currentAnswer = new Answer();
      }
      currentAnswer.options = [...answer];
      answers[currentQuestionIndex] = currentAnswer;
    } else {
      answers[currentQuestionIndex] = answer;
    }
    setAnswers(answers);
    console.log(answers.length);
    setDisabledCheckButton(false);
  };

  const checkAnswer = () => {
    const currentQuestion: Word = questions[currentQuestionIndex];
    const currentAnswer: Answer = answers[currentQuestionIndex];
    let currentProgress: number;
    if (currentQuestion.category === "guess") {
      setCorrect(currentAnswer.correct);
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
        const areWordsOrdered = orderedAnswers(currentAnswer.options.map((x) => x.order))
        if (areWordsOrdered && isSentenceComplete(currentAnswer.options)) {
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
    
    setAnswers([]);
    setDisabledCheckButton(true);
    setCorrect(true);
  };

  const handleCheckNextButton = () => answers.length && disabledCheckButton
    ? nextQuestion()
    : checkAnswer();

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

  const isSentenceComplete = (options: Answer[]) => {
    const requiredOptions = questions[currentQuestionIndex].options.filter(x => x.order > 0);
    for (const x of requiredOptions) {
      if (!options.includes(x)) {
        return false;
      }
    }
    return true;
  }

  if (questions.length) {
    let question: JSX.Element;
    const currentQuestion = questions[currentQuestionIndex]

    switch (currentQuestion.category) {
      case "guess":
        question = (
          <GuessQuestion
            question={currentQuestion.expression}
            options={currentQuestion.options}
            onChange={getAnswer}
          />
        );
        break;
      case "compound":
        question = (
          <CompoundQuestion
            question={currentQuestion.expression}
            options={currentQuestion.options}
            onChange={getAnswer}
          />
        );
        break;
      default:
        question = <div></div>;
        break;
    }

    const nextStepBox: JSX.Element = (
      <S.SuccessBox isCorrect={isCorrect} isVisible={visibleAnswerBox} >
        <h2>{isCorrect ? 'Correct' : 'Incorrect'}!</h2>
      </S.SuccessBox>
    );

    return (
      <S.LessonContainer>
        <S.ProgressBarRow>
          <ProgressBar progress={progress} />
        </S.ProgressBarRow>
        {question}
        <S.CheckButtonRow isCorrect={isCorrect}>
          <button
            disabled={isButtonDisabled()}
            onClick={handleCheckNextButton}
          >
            { visibleAnswerBox ? 'Next' : 'Check'}
          </button>
        </S.CheckButtonRow>
        {nextStepBox}
      </S.LessonContainer>
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
