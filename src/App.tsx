/* eslint-disable no-unused-vars */
import React, { Component } from "react";
/* eslint-enable no-unused-vars */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Skill from "./views/Skill";
import Lesson from "./views/Lesson";
import FinishedLesson from "./views/FinishedLesson";
import "./App.css";
import Header from "./components/Header";

class App extends Component {
  render (): JSX.Element {
    return (
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/skill/:id" component={Skill} />
            <Route path="/lesson/finished" component={FinishedLesson} />
            <Route path="/lesson/:id" component={Lesson} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;