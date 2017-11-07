import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import '../styles/Header.css';

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a>Duolingo</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}>Home</NavItem>
                        <NavItem eventKey={2}>Words</NavItem>
                        <NavItem eventKey={3}>Discussion</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}