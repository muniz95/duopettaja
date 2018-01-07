import React, { Component } from 'react'
import '../styles/GuessQuestion.css'

export default class GuessQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: {},
      question: [],
      options: []
    }

    this.getAnswer = this.getAnswer.bind(this)
  }

  componentDidMount () {
    const { question, options } = this.props
    this.setState({question, options})
  }

  getAnswer (option) {
    this.cleanSelectedAnswers()
    option.selected = true
    this.props.onChange(option)
  }

  cleanSelectedAnswers() {
    this.props.options.forEach(option => option.selected = false)
  }

  render () {
    const { question, options } = this.state
    return (
      <div>
        <div className="row">
          <h4>{question}</h4>
        </div>
        <div className="row">
          {options.map(option =>
            <div key={option.id} className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className={"well well-sm" + (option.selected ? ' selected' : '')} onClick={() => this.getAnswer(option)}>
                {option.text}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
