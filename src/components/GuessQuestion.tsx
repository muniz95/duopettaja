import React from "react";
import styled, { StyledComponent } from "styled-components";
import Word from "../models/Word";

interface IQuestionOptionProps {
  selected: boolean;
}

interface IProps {
  options: Word[];
  question: string;
  onChange: Function;
}

interface IState {
  answer: Word;
  question: string;
  options: Word[];
}

const QuestionsContainer: StyledComponent<"div", any, {}, never> = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 10% 0 10%;
`;

const QuestionContainer: StyledComponent<"div", any, {}, never> = styled.div`
  width: 50%;
  height: 50px;
`;

const QuestionOption: StyledComponent<"div", any, IQuestionOptionProps> = styled.div`
  background-color: ${(props: IQuestionOptionProps) => props.selected ? "aqua" : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: gray;
  margin: 5px;
  height: 40px;
  border-radius: 15px;
`;

const GuessQuestion = ({question, options, onChange}: any) => {
  const [localQuestion,] = React.useState(question);
  const [localOptions, setLocalOptions] = React.useState([...options]);

  const getAnswer = (option: Word) => {
    cleanSelectedAnswers();
    const newOptions = [
      ...localOptions.filter((o) => o.id !== option.id),
      option
    ].sort((a, b) => a.id - b.id);
    setLocalOptions(newOptions);
    option.selected = true;
    onChange(option);
  }

  const cleanSelectedAnswers = () => {
    options.forEach((option: Word) => {
      option.selected = false;
    });
  }

  return (
    <div>
      <div className="row">
        <h4>{localQuestion}</h4>
      </div>
      <QuestionsContainer>
        {localOptions.map((option: any) =>
        <QuestionContainer key={option.id}>
          <QuestionOption selected={option.selected} onClick={() => getAnswer(option)}>
            {option.text}
          </QuestionOption>
        </QuestionContainer>,
        )}
      </QuestionsContainer>
    </div>
  );
}

(GuessQuestion as any).whyDidYouRender = true;

export default GuessQuestion;
