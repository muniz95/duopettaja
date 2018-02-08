/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types'
import '../styles/GuessQuestion.css'

class GuessQuestion extends Component {
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
    this.cleanSelectedAnswers()
  }

  getAnswer (option) {
    option.selected = true
    this.props.onChange(option)
  }

  cleanSelectedAnswers () {
    this.props.options.forEach(option => {
      option.selected = false
    })
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
              <div className={'well well-sm' + (option.selected ? ' selected' : '')} onClick={() => this.getAnswer(option)}>
                {option.text}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

GuessQuestion.propTypes = {
  options: PropTypes.object,
  question: PropTypes.object,
  onChange: PropTypes.function
}

export default GuessQuestion
