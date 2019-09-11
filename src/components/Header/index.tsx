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
          <S.Crown>C</S.Crown>
          <S.Streak>S</S.Streak>
          <S.Lingots>L</S.Lingots>
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
