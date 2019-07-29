import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "../styles/SkillBadge.css";

interface IProps {
  name: string;
  id: number;
  active: boolean;
}

const SkillBadge = ({ name, id, active }: IProps) => {
  const badge =
    <div className={`skill skill-${active ? "active" : "inactive"}`}>
      &nbsp;
    </div>;

  return (
    <LinkContainer to={active ? `/skill/${id}` : "#"}>
      <div className="skill-card">
        {badge}
        {name}
      </div>
    </LinkContainer>
  );
};

export default SkillBadge;