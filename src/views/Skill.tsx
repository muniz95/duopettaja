import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import LessonCard from "../components/LessonCard";
import Loading from "../components/Loading";
import Lesson from "../models/Lesson";
import "../styles/Skill.css";
import http from "../utils/http";

interface IProps extends RouteComponentProps<never> {}

interface IState {
  lessons: Lesson[];
  loading: boolean;
}

class Skill extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      lessons: [],
      loading: true,
    };

    this.goToLesson = this.goToLesson.bind(this);
  }

  public goToLesson(lesson: Lesson): void {
    this.props.history.push({
      pathname: `/lesson/${lesson.id}`,
      state: {
        questions: lesson.questions,
      },
    });
  }

  public componentWillMount(): void {
    const {id} = this.props.match.params;
    http
      .get(`${process.env.REACT_APP_API}/skills/${id}/lessons`)
      .then((response) => this.setState({lessons: response.data, loading: false}))
      // tslint:disable-next-line: no-console
      .catch(console.error);
  }

  public render(): JSX.Element {
    const button = (lesson: Lesson) => lesson.completed
      ? <button className="btn btn-primary" onClick={() => this.goToLesson(lesson)}>REDO</button>
      : lesson.available
        ? <button className="btn btn-success" onClick={() => this.goToLesson(lesson)}>Start</button>
        : <button className="btn btn-default" disabled >Start</button>;

    const content: JSX.Element | JSX.Element[] = this.state.loading
      ? <Loading />
      : <div className="skills">
          { this.state.lessons.map((lesson: Lesson, index: number, array: Lesson[]) =>
            <LessonCard key={lesson.id} lesson={lesson} current={++index} total={array.length}>
              {button(lesson)}
            </LessonCard>,
          )}
        </div>;
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
