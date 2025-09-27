import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Loading from './components/Loading';

const FinishedLesson = React.lazy(() => import("./views/FinishedLesson"));
const Home = React.lazy(() => import("./views/Home"));
const Lesson = React.lazy(() => import("./views/Lesson"));
const Skill = React.lazy(() => import("./views/Skill"));

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