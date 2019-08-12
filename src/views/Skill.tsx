import React, { Component } from "react";
import LessonCard from "../components/LessonCard";
import Loading from "../components/Loading";
import Lesson from "../models/Lesson";
import "../styles/Skill.css";
import http from "../utils/http";

interface IProps {
  history: any;
  match: any;
}

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

  public goToLesson(lesson: any): void {
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
    const content: JSX.Element | JSX.Element[] = this.state.loading
      ? <Loading />
      : <div className="skills">
          { this.state.lessons.map((lesson, index, array) =>
            <LessonCard key={lesson.id} lesson={lesson} current={++index} total={array.length} />) }
        </div>;
        // <div className="skill-card" key={lesson.id}>
        //   <div className="well">
        //     <p>
        //       <b>Lesson { ++index } of {array.length}</b>
        //     </p>
        //     <p>
        //       <span>{lesson.words}</span>
        //     </p>
        //     <p>
        //       { lesson.completed
        //         ? <button className="btn btn-primary" onClick={() => this.goToLesson(lesson)}>REDO</button>
        //         : lesson.available
        //           ? <button className="btn btn-success" onClick={() => this.goToLesson(lesson)}>Start</button>
        //           : <button className="btn btn-default" disabled >Start</button>
        //       }
        //     </p>
        //   </div>
        // </div>
        // );
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
