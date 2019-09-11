/* eslint-disable no-unused-vars */
import "flag-icon-css/css/flag-icon.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/Header.css";
import S from "./styled";

interface IProps {
  goal?: string;
}

interface IState {
  goal: string;
}

class Header extends Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <S.Nav>
        <S.ItemsContainer>
          <span className="flag-icon flag-icon-gr"></span>
          <span className="fas fa-crown" style={{color: "gold"}}>58</span>
          <span className="fas fa-fire" style={{color: "orange"}}>1</span>
          <span className="fas fa-gem" style={{color: "red"}}>1500</span>
        </S.ItemsContainer>
      </S.Nav>
    );
  }
}

function mapStateToProps(state: IState): any {
  const { goal } = state;
  return {
    goal,
  };
}

export default connect(mapStateToProps, null)(Header);
