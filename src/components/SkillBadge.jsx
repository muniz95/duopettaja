import React from 'react';
import '../styles/SkillBadge.css';

const click = (id) => {
  alert(id);
}

export default function SkillBadge({ name, id, active }) {
  return (
    <div>
      <div
        onClick={() => { if (active) click(id)} }
        className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
        <div className={`skill center-block skill-${active ? 'active' : 'inactive'}`}>
          &nbsp;
        </div>
        {name}
      </div>
    </div>
  );
}
