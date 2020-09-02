import { AxiosResponse } from "axios";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import LessonCard from "../components/LessonCard";
import Loading from "../components/Loading";
import Lesson from "../models/Lesson";
import http from "../utils/http";

const Skill = (props: RouteComponentProps) => {
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const {id} = props.match.params as any;
    http
      .get(`${process.env.REACT_APP_API}/skills/${id}/lessons`)
      .then((response: AxiosResponse<Lesson[]>) => {
        setLessons(response.data);
        setLoading(false);
      })
      // tslint:disable-next-line: no-console
      .catch(console.error);
  }, []);

  const goToLesson = (lesson: Lesson) => {
    props.history.push({
      pathname: `/lesson/${lesson.id}`,
      state: {
        questions: lesson.questions,
      },
    });
  }

  const button = (lesson: Lesson): JSX.Element => lesson.completed
    ? <button className="btn btn-primary" onClick={() => goToLesson(lesson)}>REDO</button>
    : lesson.available
      ? <button className="btn btn-success" onClick={() => goToLesson(lesson)}>Start</button>
      : <button className="btn btn-default" disabled >Start</button>;

  const content: JSX.Element | JSX.Element[] = loading
    ? <Loading />
    : <div className="skills">
        { lessons.map((lesson: Lesson, index: number, array: Lesson[]) =>
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

export default Skill;
