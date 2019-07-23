/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
/* eslint-enable no-unused-vars */
import dotenv from "dotenv";
import http from "../utils/http";
import SkillBadge from "../components/SkillBadge";
import Loading from "../components/Loading";
import "../styles/Home.css";
import Skill from "../models/Skill";

dotenv.config();

interface IProps {}

interface IState {
  skills: Skill[];
  errorMessage: string;
  loading: boolean;
}

export default class Home extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      skills: [],
      errorMessage: "",
      loading: true
    };
  }

  componentDidMount (): void {
    http
      .get(`${process.env.REACT_APP_API}/skills`)
      .then(response => this.setState({ skills: response.data, loading: false }))
      .catch(error => {
        console.log(error);
        this.setState({ errorMessage: "An error occured. Refresh the page.", loading: false });
      });
  }

  render (): JSX.Element {
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
            { this.state.skills.map((skill, id) =>
              <div className="skill-card" key={id}>
                <SkillBadge {...skill} />
              </div>
              // <SkillBadge key={skill.id} name={skill.name} id={skill.id} active={skill.active} />
            ) }
          </div>
        </div>;
    return content;
  }
}
