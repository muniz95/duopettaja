import React, { Component } from 'react';
import http from '../utils/http'
import '../styles/Skill.css';

export default class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: []
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
      .get(`http://localhost:8081/skills/${id}/lessons`)
      .then(response => this.setState({lessons: response.data}))
      .catch(console.error)
    // this.setState({
    //   lessons: [
    //     { 
    //       id: 1,
    //       words: ['Minä', 'Sinä', 'Hän'],
    //       completed: true,
    //       questions: [
    //         {
    //           id: 1,
    //           category: 'guess',
    //           expression: 'Minä',
    //           options: [
    //             { id: 1, text: 'I', correct: true, selected: false },
    //             { id: 2, text: 'You', correct: false, selected: false },
    //             { id: 3, text: 'We', correct: false, selected: false },
    //             { id: 4, text: 'Me', correct: false, selected: false }
    //           ],
    //           weight: 33
    //         },
    //         {
    //           id: 2,
    //           category: 'compound',
    //           expression: 'Minä olen mies',
    //           options: [
    //             { id: 1, text: 'I', correct: true, order: 1 },
    //             { id: 2, text: 'apple', correct: false, order: 0 },
    //             { id: 3, text: 'go', correct: false, order: 0 },
    //             { id: 4, text: 'am', correct: true, order: 2 },
    //             { id: 5, text: 'a', correct: true, order: 3 },
    //             { id: 6, text: 'an', correct: false, order: 0 },
    //             { id: 7, text: 'man', correct: true, order: 4 }
    //           ],
    //           weight: 33
    //         },
    //         {
    //           id: 3,
    //           category: 'guess',
    //           expression: 'Minä',
    //           options: [
    //             { id: 1, text: 'I', correct: true },
    //             { id: 2, text: 'You', correct: false },
    //             { id: 3, text: 'We', correct: false },
    //             { id: 4, text: 'Me', correct: false }
    //           ],
    //           weight: 34
    //         }
    //       ]
    //     },
    //     { id: 2, words: ['Me', 'Te', 'He'], completed: false }
    //   ]
    // })
  }

  render() {
    return (
      <div>
        <div className="row">
          <h2>Skill page</h2>
        </div>
          <div className="row">
            { this.state.lessons.map((lesson, index, array) =>
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
            ) }
          </div>
        </div>
    )
  }
}
