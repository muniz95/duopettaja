/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types'
import http from '../utils/http'
import Loading from '../components/Loading'
import '../styles/Skill.css'

class Skill extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lessons: [],
      loading: true
    }

    this.goToLesson = this.goToLesson.bind(this)
  }

  goToLesson (lesson) {
    this.props.history.push({
      pathname: `/lesson/${lesson.id}`,
      state: {
        questions: lesson.questions
      }
    })
  }

  componentWillMount () {
    const {id} = this.props.match.params
    http
      .get(`${process.env.REACT_APP_API}/skills/${id}/lessons`)
      .then(response => this.setState({lessons: response.data, loading: false}))
      .catch(console.error)
  }

  render () {
    const content = this.state.loading
      ? <Loading />
      : this.state.lessons.map((lesson, index, array) =>
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={lesson.id}>
          <div className="well">
            <p>
              <b>Lesson { ++index } of {array.length}</b>
            </p>
            <p>
              <span>{lesson.words.join(', ')}</span>
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

Skill.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default Skill