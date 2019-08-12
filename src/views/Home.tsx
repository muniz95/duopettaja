/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
import dotenv from "dotenv";
import React, { Component } from "react";
import Loading from "../components/Loading";
import SkillCard from "../components/SkillCard";
import Skill from "../models/Skill";
import "../styles/Home.css";
import http from "../utils/http";

dotenv.config();

interface IState {
  skills: Skill[];
  errorMessage: string;
  loading: boolean;
}

export default class Home extends Component<{}, IState> {
  public whyDidYouRender = true;

  constructor(props: {}) {
    super(props);
    this.state = {
      errorMessage: "",
      loading: true,
      skills: [],
    };
  }

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
      ? <div className="row">
          <Loading />
        </div>
      : <div className="row">
          <p className="text-left">
            Home
          </p>
          <h2>{this.state.errorMessage}</h2>
          <div className="skills">
            { this.state.skills.map((skill) => <SkillCard {...skill} key={skill.id} />) }
          </div>
        </div>;
    return content;
  }
}
