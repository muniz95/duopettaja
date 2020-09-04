import React from "react";
import Loading from "../components/Loading";
import SkillCard from "../components/SkillCard";
import Skill from "../models/Skill";
import "../styles/Home.css";
import http from "../utils/http";

interface IState {
  skills: Skill[];
  errorMessage: string;
  loading: boolean;
}

const Home = () => {
  const [errorMessage, setErrorMessage] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [skills, setSkills] = React.useState([])

  // constructor(props: {}) {
  //   super(props);
  //   this.state = {
  //     errorMessage: "",
  //     loading: true,
  //     skills: [],
  //   };
  // }
  React.useEffect(() => {
    http
      .get(`${process.env.REACT_APP_API}/skills`)
      .then((response) => {
        setSkills(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setErrorMessage(`An error occured: ${error}. Refresh the page.`)
        setLoading(false)
      });
  }, [])

  const content: JSX.Element = loading
  ? <Loading />
  : <div className="row">
      <h2>Home</h2>
      <h4>{errorMessage}</h4>
      <div className="skills">
        { skills.map((skill: Skill) => <SkillCard {...skill} key={skill.id} />) }
      </div>
    </div>;
  return content;
}

(Home as any).whyDidYouRender = true

export default Home
