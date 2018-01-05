import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/Skill.css';

export default class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: []
    }
  }

  componentWillMount() {
    this.setState({
      lessons: [
        { id: 1, words: ['Minä', 'Sinä', 'Hän'], completed: true },
        { id: 2, words: ['Me', 'Te', 'He'], completed: false }
      ]
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <h2>Skill page</h2>
        </div>
          <div className="row">
            { this.state.lessons.map((lesson, index) =>
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={lesson.id}>
                <div className="well">
                  <p>
                    <b>Lesson { index + 1 } of {this.state.lessons.length}</b>
                  </p>
                  <p>
                    <span>{lesson.words.join(', ')}</span>
                  </p>
                  <p>
                    <LinkContainer to={'/lesson'}>
                      <button className="btn btn-primary">REDO</button>
                    </LinkContainer>
                  </p>
                </div>
              </div>
            ) }
          </div>
        </div>
    )
  }
}
