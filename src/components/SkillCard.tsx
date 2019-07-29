import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import sc, { StyledComponent } from "styled-components";
import "../styles/SkillBadge.css";

interface IProps {
  name: string;
  id: number;
  active: boolean;
}

const SkillCardBody: StyledComponent<"div", any, {}, never> = sc.div`
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  border-style: solid;
`;

const SkillCardContainer: StyledComponent<"div", any, {}, never> = sc.div`
  height: 150px;
  @media (max-width: 767px) {
    width: 50%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 33%;
  }
  @media (min-width: 1024px) {
    width: 25%;
  }
`;

const SkillCard = ({ name, id, active }: IProps): JSX.Element => {
  const body: JSX.Element =
    <SkillCardContainer>
      <SkillCardBody>
        {name}
      </SkillCardBody>
    </SkillCardContainer>;
  const badge: JSX.Element =
    <div className={`skill skill-${active ? "active" : "inactive"}`}>
      &nbsp;
    </div>;

  return (
    <LinkContainer to={active ? `/skill/${id}` : "#"}>
      {body}
    </LinkContainer>
  );
};

export default SkillCard;