import React, { Component } from 'react';
import Skill from '../components/Skill';

export default class Home extends Component {
    render() {
        return (
            <div>
                <p>
                    Home
                </p>
                <Skill name='0' id='Id: 0' active />
                <Skill name='1' id='Id: 1' />
                <Skill name='2' id='Id: 2' />
                <Skill name='3' id='Id: 3' />
                <Skill name='4' id='Id: 4' />
                <Skill name='5' id='Id: 5' />
                <Skill name='6' id='Id: 6' />
                <Skill name='7' id='Id: 7' />
                <Skill name='8' id='Id: 8' />
                <Skill name='9' id='Id: 9' />
            </div>
        );
    }
}