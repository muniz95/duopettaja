import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/SkillBadge.css';

export default function SkillBadge({ name, id, active }) {
  return (
    <div className="text-center">
      {/*<div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">*/}
        <LinkContainer to={'/skill'}>
          <div className={`skill center-block skill-${active ? 'active' : 'inactive'}`}>
            &nbsp;
          </div>
        </LinkContainer>
        {name}
      {/*</div>*/}
    </div>
  );
}
