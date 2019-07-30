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
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: row;
  width: 90%;
  border-style: solid;
`;

const SkillCardContainer: StyledComponent<"div", any, {}, never> = sc.div`
  height: 150px;
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 33%;
  }
  @media (min-width: 1024px) {
    width: 25%;
  }
`;

const SkillCardHealthBar = sc.div`
  background-color: blue;
  width: 20%;
  height: 100%
`;

const SkillCardLabel = sc.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillCard = ({ name, id, active }: IProps): JSX.Element => {
  const body: JSX.Element =
    <SkillCardContainer>
      <SkillCardBody>
        <SkillCardHealthBar />
        <SkillCardLabel>
          {name}
        </SkillCardLabel>
      </SkillCardBody>
    </SkillCardContainer>;

  return (
    <LinkContainer to={active ? `/skill/${id}` : "#"}>
      {body}
    </LinkContainer>
  );
};

export default SkillCard;