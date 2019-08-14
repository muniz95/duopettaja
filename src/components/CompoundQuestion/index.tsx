import React, { Component } from "react";
import Word from "../../models/Word";
import * as S from "./styled";

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

const byIdAscending: (a: Word, b: Word) => number = (a: Word, b: Word) => a.id - b.id;

class CompoundQuestion extends Component<IProps, IState> {
  public whyDidYouRender: boolean = true;

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
    if (option.selected) {
      return;
    }
    option.selected = true;
    const selectedWords: Word[] = [...this.state.selectedWords, option];
    const availableWords: Word[] = [
      option,
      ...this.state.availableWords.filter((el: Word) => el.id !== option.id),
    ].sort(byIdAscending);
    this.setState({
      availableWords,
      selectedWords,
    });
    this.getAnswer(selectedWords);
  }

  public deselectWord(option: Word): void {
    option.selected = false;
    const selectedWords: Word[] = this.state.selectedWords.filter((el: Word) => el.id !== option.id);
    const availableWords: Word[] = [
      option,
      ...this.state.availableWords.filter((el: Word) => el.id !== option.id)]
    .sort(byIdAscending);
    this.setState({
      availableWords,
      selectedWords,
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
          <S.SelectedWordsContainer>
            <S.SelectedWordsBox>
              {selectedWords.map((option: Word) =>
                <S.WordBox key={option.id} selected={false} onClick={() => this.deselectWord(option)}>
                  {option.text}
                </S.WordBox>,
              )}
            </S.SelectedWordsBox>
          </S.SelectedWordsContainer>
        </div>
        <div className="row">
          <S.AvailableWordsContainer>
            {availableWords.map((option: Word) =>
              <S.WordBox key={option.id} selected={option.selected} onClick={() => this.selectWord(option)}>
                {option.text}
              </S.WordBox>,
            )}
          </S.AvailableWordsContainer>
        </div>
      </div>
    );
  }
}

export default CompoundQuestion;
