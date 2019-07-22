/* eslint-disable no-unused-vars */
import React, { Component } from "react";
/* eslint-enable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import "../styles/GuessQuestion.css";
import Word from "../models/Word";

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

class GuessQuestion extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      answer: new Word(),
      question: '',
      options: []
    };

    this.getAnswer = this.getAnswer.bind(this);
  }

  UNSAFE_componentWillMount () {
    const { question, options } = this.props;
    this.setState({question, options});
  }

  UNSAFE_componentWillReceiveProps (props: IProps) {
    const { question, options } = props;
    this.setState({question, options});
  }

  getAnswer (option: Word) {
    this.cleanSelectedAnswers();
    option.selected = true;
    this.props.onChange(option);
  }

  cleanSelectedAnswers () {
    this.props.options.forEach(option => {
      option.selected = false;
    });
  }

  render () {
    const { question, options } = this.state;
    return (
      <div>
        <div className="row">
          <h4>{question}</h4>
        </div>
        <div className="row">
          {options.map(option =>
            <div key={option.id} className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className={"well well-sm" + (option.selected ? " selected" : "")} onClick={() => this.getAnswer(option)}>
                {option.text}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GuessQuestion;
