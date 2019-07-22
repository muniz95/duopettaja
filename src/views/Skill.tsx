/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
/* eslint-enable no-unused-vars */
import http from "../utils/http";
import Loading from "../components/Loading";
import "../styles/Skill.css";

interface IProps {
  history: any;
  match: any;
}

interface IState {
  lessons: any[];
  loading: boolean;
}

class Skill extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      lessons: [],
      loading: true
    };

    this.goToLesson = this.goToLesson.bind(this);
  }

  goToLesson (lesson: any): void {
    this.props.history.push({
      pathname: `/lesson/${lesson.id}`,
      state: {
        questions: lesson.questions
      }
    });
  }

  componentWillMount (): void {
    const {id} = this.props.match.params;
    http
      .get(`${process.env.REACT_APP_API}/skills/${id}/lessons`)
      .then(response => this.setState({lessons: response.data, loading: false}))
      .catch(console.error);
  }

  render (): JSX.Element {
    const content: JSX.Element | JSX.Element[] = this.state.loading
      ? <Loading />
      : this.state.lessons.map((lesson, index, array) =>
        <div className="skill-card" key={lesson.id}>
          <div className="well">
            <p>
              <b>Lesson { ++index } of {array.length}</b>
            </p>
            <p>
              <span>{lesson.words}</span>
            </p>
            <p>
              { lesson.completed
                ? <button className="btn btn-primary" onClick={() => this.goToLesson(lesson)}>REDO</button>
                : lesson.available
                  ? <button className="btn btn-success" onClick={() => this.goToLesson(lesson)}>Start</button>
                  : <button className="btn btn-default" disabled >Start</button>
              }
            </p>
          </div>
        </div>
      );
    return (
      <div>
        <div className="row">
          <h2>Skill page</h2>
        </div>
        <div className="row">
          { content }
        </div>
      </div>
    );
  }
}

export default Skill;