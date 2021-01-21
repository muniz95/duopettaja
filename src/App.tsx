import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Loading from './components/Loading';

const FinishedLesson = React.lazy(() => import("./views/FinishedLesson"));
const Home = React.lazy(() => import("./views/Home"));
const Lesson = React.lazy(() => import("./views/Lesson"));
const Skill = React.lazy(() => import("./views/Skill"));

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/skill/:id" component={Skill} />
            <Route path="/lesson/finished" component={FinishedLesson} />
            <Route path="/lesson/:id" component={Lesson} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
};

export default App;
