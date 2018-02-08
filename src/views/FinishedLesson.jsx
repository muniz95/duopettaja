/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'

class FinishedLesson extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: props.location.state.questions
    }
  }

  render () {
    return (
      <div>
        <h2>Finished :)</h2>
        <div>{this.state.questions.filter(a => a.correct).length} correct questions</div>
        <div>{this.state.questions.filter(a => !a.correct).length} wrong questions</div>
        <LinkContainer to={'/'}>
          <a>Home</a>
        </LinkContainer>
      </div>
    )
  }
}

FinishedLesson.propTypes = {
  location: PropTypes.object
}

export default FinishedLesson