import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Skill from './views/Skill';
import './App.css';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/skill' component={Skill} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
