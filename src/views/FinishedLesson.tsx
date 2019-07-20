/* eslint-disable no-unused-vars */
import React, { Component } from "react";
/* eslint-enable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import http from "../utils/http";

class FinishedLesson extends Component {
  constructor (props) {
    super(props);

    const { questions, lessonId } = props.location.state;
    this.state = { questions, lessonId };
    console.log(this.state);
  }

  componentDidMount () {
    const data = { completed: true };
    http
      .put(`${process.env.REACT_APP_API}/lessons/${this.state.lessonId}/complete`, data)
      .then(console.log);
  }

  render () {
    return (
      <div>
        <h2>Finished :)</h2>
        <div>{this.state.questions.filter(a => a.correct).length} correct questions</div>
        <div>{this.state.questions.filter(a => !a.correct).length} wrong questions</div>
        <LinkContainer to={"/"}>
          <a>Home</a>
        </LinkContainer>
      </div>
    );
  }
}

FinishedLesson.propTypes = {
  location: PropTypes.object
};

export default FinishedLesson;