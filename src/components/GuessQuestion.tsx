import React, { Component } from "react";
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
  height: 30px;
`;

const QuestionOption: StyledComponent<"div", any, IQuestionOptionProps> = styled.div`
  background-color: ${(props: IQuestionOptionProps) => props.selected ? "aqua" : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: gray;
  margin: 5px;
`;

const GuessQuestion = ({question, options, onChange}: any) => {
  const whyDidYouRender: boolean = true;
  const [answer, setAnswer] = React.useState(new Word());
  // const [options, setOptions] = React.useState([]);
  // const [question, setQuestion] = React.useState("");

  // const componentWillMount(): void {
  //   const { question, options } = this.props;
  //   this.setState({question, options});
  // }

  // const componentWillReceiveProps(props: IProps): void {
  //   const { question, options } = props;
  //   this.setState({question, options});
  // }

  const getAnswer = (option: Word) => {
    cleanSelectedAnswers();
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
        <h4>{question}</h4>
      </div>
      <QuestionsContainer>
        {options.map((option: any) =>
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

export default GuessQuestion;
