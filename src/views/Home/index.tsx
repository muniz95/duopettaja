import dotenv from "dotenv";
import React from "react";
import Loading from "../../components/Loading";
import SkillCard from "../../components/SkillCard";
import Skill from "../../models/Skill";
import http from "../../utils/http";
import S from "./styled";

dotenv.config();

interface IState {
  skills: Skill[];
  errorMessage: string;
  loading: boolean;
}

export default class Home extends React.Component<{}, IState> {
  public whyDidYouRender: boolean = true;

  state = {
    errorMessage: "",
    loading: true,
    skills: [],
  };

  public componentDidMount(): void {
    http
      .get(`${process.env.REACT_APP_API}/skills`)
      .then((response) => this.setState({ skills: response.data, loading: false }))
      .catch((error) => {
        this.setState({ errorMessage: `An error occured: ${error}. Refresh the page.`, loading: false });
      });
  }

  public render(): JSX.Element {
    const content: JSX.Element = this.state.loading
    ? <Loading />
    : <S.HomeContainer>
        <h4>{this.state.errorMessage}</h4>
        <S.SkillContainer>
          { this.state.skills.map((skill: Skill) => <SkillCard {...skill} key={skill.id} />) }
        </S.SkillContainer>
      </S.HomeContainer>;
    return content;
  }
}
