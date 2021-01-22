import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Loading from './components/Loading';
import { RootState } from "./redux/reducers";

const Login = React.lazy(() => import("./views/Login"));
const FinishedLesson = React.lazy(() => import("./views/FinishedLesson"));
const Home = React.lazy(() => import("./views/Home"));
const Lesson = React.lazy(() => import("./views/Lesson"));
const Skill = React.lazy(() => import("./views/Skill"));

const publicRoutes = [
  <Route exact path="/" component={Login} key={Login.name} />
];

const privateRoutes = [
  <Route exact path="/" component={Home} key={Home.name} />,
  <Route path="/skill/:id" component={Skill} key={Skill.name} />,
  <Route path="/lesson/finished" component={FinishedLesson} key={FinishedLesson.name} />,
  <Route path="/lesson/:id" component={Lesson} key={Lesson.name} />,
];

const App = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state);
  return (
    <Router>
      {isAuthenticated && <Header />}
      <div className="container">
        <React.Suspense fallback={<Loading />}>
          <Switch>
            {
              isAuthenticated
                ? [...privateRoutes]
                : [...publicRoutes]
            }
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
};

export default App;
