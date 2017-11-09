import React, { Component } from 'react';
import Skill from '../components/Skill';

export default class Home extends Component {
    render() {
        return (
            <div>
                <p>
                    Home
                </p>
                <Skill name='Basics 1' id='1' active />
                <Skill name='Dates' id='2' />
                <Skill name='Work' id='3' />
                <Skill name='V. Infin' id='4' />
                <Skill name='Adessive case' id='5' />
                <Skill name='Ablative case' id='6' />
                <Skill name='Allative case' id='7' />
                <Skill name='Adverbs' id='8' />
                <Skill name='Places' id='9' />
                <Skill name='Abstract' id='10' />
            </div>
        );
    }
}