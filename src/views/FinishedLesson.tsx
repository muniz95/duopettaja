import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import http from "../utils/http";
import Word from "../models/Word";

interface IProps {
  location: any;
}

interface IState {
  questions: Word[];
  lessonId: number;
}

class FinishedLesson extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);

    const { questions, lessonId } = props.location.state;
    this.state = { questions, lessonId };
    console.log(this.state);
  }

  componentDidMount (): void {
    const data: any = { completed: true };
    http
      .put(`${process.env.REACT_APP_API}/lessons/${this.state.lessonId}/complete`, data)
      .then(console.log);
  }

  render (): JSX.Element {
    return (
      <div>
        <h2>Finished :)</h2>
        <div>{this.state.questions.filter(a => a.correct).length} correct questions</div>
        <div>{this.state.questions.filter(a => !a.correct).length} wrong questions</div>
        <LinkContainer to={"/"}>
          <button>Home</button>
        </LinkContainer>
      </div>
    );
  }
}

export default FinishedLesson;