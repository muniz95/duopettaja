import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home';
import './App.css';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Router>
            <Route to='/' component={Home} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
