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
                className="col-xs-3 col-md-4 col-sm-6 col-xs-12 skill">
                {name}
            </div>
        </div>
    );
}