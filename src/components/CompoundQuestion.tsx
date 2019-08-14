import React, { Component } from "react";
import Word from "../models/Word";
import "../styles/CompoundQuestion.css";

interface IProps {
  question: string;
  options: Word[];
  onChange: Function;
}

interface IState {
  question: string;
  selectedWords: Word[];
  availableWords: Word[];
}

class CompoundQuestion extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      availableWords: [],
      question: "",
      selectedWords: [],
    };

    this.selectWord = this.selectWord.bind(this);
    this.deselectWord = this.deselectWord.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
  }

  public componentDidMount(): void {
    this.setState({
      availableWords: this.props.options,
      question: this.props.question,
    });
  }

  public selectWord(option: Word): void {
    const selectedWords: Word[] = [...this.state.selectedWords, option];
    this.setState({
      availableWords: this.state.availableWords.filter((el) => el.id !== option.id),
      selectedWords,
    });
    this.getAnswer(selectedWords);
  }

  public deselectWord(option: Word): void {
    this.setState({
      availableWords: [...this.state.availableWords, option],
      selectedWords: this.state.selectedWords.filter((el) => el.id !== option.id),
    });
  }

  public getAnswer(selectedWords: Word[]): void {
    this.props.onChange(selectedWords);
  }

  public render(): JSX.Element {
    const { question, selectedWords, availableWords } = this.state;
    return (
      <div>
        <div className="row">
          <h4>{question}</h4>
        </div>
        <div className="row">
          <div className="answer">
            {selectedWords.map((option) =>
              <div key={option.id} className="word"
                onClick={() => this.deselectWord(option)}>{option.text}</div>,
            )}
          </div>
        </div>
        <div className="row">
          {availableWords.map((option) =>
            <div key={option.id} className="word"
              onClick={() => this.selectWord(option)}>{option.text}</div>,
          )}
        </div>
      </div>
    );
  }
}

export default CompoundQuestion;
