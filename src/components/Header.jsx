import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import '../styles/Header.css';

export default class Header extends Component {
    render() {
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
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}