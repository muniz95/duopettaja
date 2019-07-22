/* eslint-disable no-unused-vars */
import React, { Component } from "react";
/* eslint-enable no-unused-vars */
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import "../styles/Header.css";

interface IProps {
  goal: string;
}

interface IState {
  goal: string;
}

class Header extends Component<IProps, IState> {
  render () {
    return (
      <Navbar collapseOnSelect>
        <header>
          <Navbar.Brand>
            <LinkContainer to={"/"}>
              <a>Duopettaja</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </header>
        <Navbar.Collapse>
          <Nav>
            {/*
            <LinkContainer to={'/skill'}>
              <NavItem eventKey={1}>Skill</NavItem>
            </LinkContainer>
            <LinkContainer to={'/lesson'}>
              <NavItem eventKey={2}>Lesson</NavItem>
            </LinkContainer>
            */}
            <NavItem key={2}>Goal: {this.props.goal}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps (state: IState) {
  const { goal } = state;
  return {
    goal
  };
}

export default connect(mapStateToProps, null)(Header);
