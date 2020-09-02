import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import FinishedLesson from "./views/FinishedLesson";
import Home from "./views/Home";
import Lesson from "./views/Lesson";
import Skill from "./views/Skill";

const App = () => {
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

export default App;
