import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../styles/Header.css'

class Header extends Component {
  render () {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to={'/'}>
              <a>Duopettaja</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/skill'}>
              <NavItem eventKey={1}>Skill</NavItem>
            </LinkContainer>
            <LinkContainer to={'/lesson'}>
              <NavItem eventKey={2}>Lesson</NavItem>
            </LinkContainer>
            <NavItem eventKey={2}>Goal: {this.props.goal}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps (state) {
  const { goal } = state
  return {
    goal
  }
}

export default connect(mapStateToProps, null)(Header)
