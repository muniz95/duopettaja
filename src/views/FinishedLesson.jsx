import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

export default class FinishedLesson extends Component {
  constructor(props) {
    super(props)
    
    console.log(props)
    this.state = {
      answers: props.location.state.answers
    }
  }
  
  render() {
    return (
      <div>
        <h2>Finished :)</h2>
        <div>{this.state.answers.filter(a => a.correct).length} correct answers</div>
        <div>{this.state.answers.filter(a => !a.correct).length} wrong answers</div>
        <LinkContainer to={'/'}>
          <a>Home</a>
        </LinkContainer>
      </div>
    )
  }
}