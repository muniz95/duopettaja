import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Skill from './views/Skill'
import Lesson from './views/Lesson'
import FinishedLesson from './views/FinishedLesson'
import './App.css'
import Header from './components/Header'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/skill' component={Skill} />
              <Route path='/lesson/finished' component={FinishedLesson} />
              <Route path='/lesson' component={Lesson} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
