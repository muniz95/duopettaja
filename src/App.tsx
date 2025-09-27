import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Loading from './components/loading';

const FinishedLesson = React.lazy(() => import("./views/finished-lesson"));
const Home = React.lazy(() => import("./views/home"));
const Lesson = React.lazy(() => import("./views/lesson"));
const Skill = React.lazy(() => import("./views/skill"));

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skill/:id" element={<Skill />} />
            <Route path="/lesson/finished" element={<FinishedLesson />} />
            <Route path="/lesson/:id" element={<Lesson />} />
          </Routes>
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;