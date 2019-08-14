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

class GuessQuestion extends Component<IProps, IState> {
  public whyDidYouRender: boolean = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      answer: new Word(),
      options: [],
      question: "",
    };

    this.getAnswer = this.getAnswer.bind(this);
  }

  public componentWillMount(): void {
    const { question, options } = this.props;
    this.setState({question, options});
  }

  public componentWillReceiveProps(props: IProps): void {
    const { question, options } = props;
    this.setState({question, options});
  }

  public getAnswer(option: Word): void {
    this.cleanSelectedAnswers();
    option.selected = true;
    this.props.onChange(option);
  }

  public cleanSelectedAnswers(): void {
    this.props.options.forEach((option: Word) => {
      option.selected = false;
    });
  }

  public render(): JSX.Element {
    const { question, options } = this.state;
    return (
      <div>
        <div className="row">
          <h4>{question}</h4>
        </div>
        <QuestionsContainer>
          {options.map((option: Word) =>
          <QuestionContainer key={option.id}>
            <QuestionOption selected={option.selected} onClick={() => this.getAnswer(option)}>
              {option.text}
            </QuestionOption>
          </QuestionContainer>,
          )}
        </QuestionsContainer>
      </div>
    );
  }
}

export default GuessQuestion;
