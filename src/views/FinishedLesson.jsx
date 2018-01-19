import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

export default class FinishedLesson extends Component {
  constructor(props) {
    super(props)
    
    console.log(props)
    this.state = {
      questions: props.location.state.questions
    }
  }
  
  render() {
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