import React from 'react';
import '../styles/Skill.css';

const click = (id) => {
    alert(id);
}

export default function Skill({name, id, active}) {
    return (
        <div>
            <div
                onClick={() => { if (active) click(id)} }
                className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
                <div className={active ? 'skill skill-active' : 'skill skill-inactive'}>
                    {name}
                </div>
            </div>
        </div>
    );
}