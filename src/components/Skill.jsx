import React from 'react';
import '../styles/Skill.css';

const click = (id) => {
    alert(id);
}

export default function Skill({name, id}) {
    return (
        <div>
            <div
                onClick={() => click(id)}
                className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
                <div className="skill">
                    {name}
                </div>
            </div>
        </div>
    );
}