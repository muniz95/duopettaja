import React from "react";
import Loading from "../../components/loading";
import SkillCard from "../../components/skill-card";
import Skill from "../../models/skill";
import http from "../../utils/http";
import * as S from './styled';

const Home = () => {
  const [errorMessage, setErrorMessage] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [skills, setSkills] = React.useState([])

  React.useEffect(() => {
    http
      .get(`${import.meta.env.VITE_API}/skills`)
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
  : <div>
      <h4>{errorMessage}</h4>
      <S.SkillsContainer>
        { skills.map((skill: Skill) => <SkillCard {...skill} key={skill.id} />) }
      </S.SkillsContainer>
    </div>;
  return content;
}

(Home as any).whyDidYouRender = true

export default Home
