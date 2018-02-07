import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/SkillBadge.css';

export default function SkillBadge({ name, id, active }) {
  const badge = active
  ?
    <LinkContainer to={active ? `/skill/${id}` : ''}>
      <div className={`skill center-block skill-${active ? 'active' : 'inactive'}`}>
        &nbsp;
      </div>
    </LinkContainer>
  :
    <div>
      <div className={`skill center-block skill-${active ? 'active' : 'inactive'}`}>
        &nbsp;
      </div>
    </div>
    
  return (
    <div className="text-center">
      {/*<div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">*/}
        {badge}
        {name}
      {/*</div>*/}
    </div>
  );
}
