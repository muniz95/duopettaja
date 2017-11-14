import React, { Component } from 'react';
import SkillBadge from '../components/SkillBadge';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        }
    }
    
    componentDidMount() {
        this.setState({
            skills: [
                { id: 1, name: 'Basics 1', active: true },
                { id: 2, name: 'Dates', active: true },
                { id: 3, name: 'Work', active: false },
                { id: 4, name: 'V. Infin', active: false },
                { id: 5, name: 'Adessive case', active: false },
                { id: 6, name: 'Ablative case', active: false },
                { id: 7, name: 'Allative case', active: false },
                { id: 8, name: 'Adverbs', active: false },
                { id: 9, name: 'Places', active: false },
                { id: 10, name: 'Abstract', active: false },
            ]
        });
    }
    
    render() {
        return (
            <div className="row">
                <p className="text-left">
                    Home
                </p>
                { this.state.skills.map(skill => 
                    <SkillBadge key={skill.id} name={skill.name} id={skill.id} active={skill.active} />
                ) }
            </div>
        );
    }
}