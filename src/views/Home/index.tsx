import React from "react";
import Loading from "../../components/Loading";
import SkillCard from "../../components/SkillCard";
import Skill from "../../models/Skill";
import http from "../../utils/http";
import * as S from './styled';

const Home = () => {
  const [errorMessage, setErrorMessage] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [skills, setSkills] = React.useState([])

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
