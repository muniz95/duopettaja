/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types'
import '../styles/CompoundQuestion.css'

class CompoundQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: '',
      selectedWords: [],
      availableWords: []
    }

    this.selectWord = this.selectWord.bind(this)
    this.deselectWord = this.deselectWord.bind(this)
    this.getAnswer = this.getAnswer.bind(this)
  }

  componentDidMount () {
    this.setState({
      question: this.props.question,
      availableWords: this.props.options
    })
  }

  selectWord (option) {
    const selectedWords = [...this.state.selectedWords, option]
    this.setState({
      selectedWords,
      availableWords: this.state.availableWords.filter(el => el.id !== option.id)
    })
    this.getAnswer(selectedWords)
  }

  deselectWord (option) {
    this.setState({
      availableWords: [...this.state.availableWords, option],
      selectedWords: this.state.selectedWords.filter(el => el.id !== option.id)
    })
  }

  getAnswer (selectedWords) {
    this.props.onChange(selectedWords)
  }

  render () {
    const { question, selectedWords, availableWords } = this.state
    return (
      <div>
        <div className="row">
          <h4>{question}</h4>
        </div>
        <div className="row">
          <div className="answer">
            {selectedWords.map(option =>
              <div key={option.id} className="word"
                onClick={() => this.deselectWord(option)}>{option.text}</div>
            )}
          </div>
        </div>
        <div className="row">
          {availableWords.map(option =>
            <div key={option.id} className="word"
              onClick={() => this.selectWord(option)}>{option.text}</div>
          )}
        </div>
      </div>
    )
  }
}

CompoundQuestion.propTypes = {
  options: PropTypes.object,
  question: PropTypes.object,
  onChange: PropTypes.function
}

export default CompoundQuestion
