import React, { Component } from 'react';
import http from '../utils/http'
import Loading from '../components/Loading'
import '../styles/Skill.css';

export default class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      loading: true
    }
    
    this.goToLesson = this.goToLesson.bind(this)
  }
  
  goToLesson(lesson) {
    this.props.history.push({
      pathname: `/lesson/${lesson.id}`,
      state: {
        questions: lesson.questions
      }
    });
  }

  componentWillMount() {
    const {id} = this.props.match.params
    http
      .get(`${process.env.REACT_APP_API}/skills/${id}/lessons`)
      .then(response => this.setState({lessons: response.data, loading: false}))
      .catch(console.error)
  }

  render() {
    const content = this.state.loading
    ?
      <Loading />
    :
     this.state.lessons.map((lesson, index, array) =>
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={lesson.id}>
          <div className="well">
            <p>
              <b>Lesson { ++index } of {array.length}</b>
            </p>
            <p>
              <span>{lesson.words.split('*').join(', ')}</span>
            </p>
            <p>
              { lesson.completed 
              ?
                <button className="btn btn-primary" onClick={() => this.goToLesson(lesson)}>REDO</button>
              :
                <button className="btn btn-success" onClick={() => this.goToLesson(lesson)}>Start</button>
              }
            </p>
          </div>
        </div>
      )
    return (
      <div>
        <div className="row">
          <h2>Skill page</h2>
        </div>
          <div className="row">
            { content }
          </div>
        </div>
    )
  }
}
