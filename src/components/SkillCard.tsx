import React from "react";
import { Link } from "react-router-dom";
import styled, { StyledComponent } from "styled-components";
import "../styles/SkillBadge.css";

interface IProps {
  name: string;
  id: number;
  active: boolean;
}

interface IHealthBarProps {
  active: boolean;
}

const SkillCardBody: StyledComponent<"div", any, {}> = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: row;
  width: 90%;
  border-style: solid;
`;

const SkillCardContainer: StyledComponent<"div", any, {}> = styled.div`
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

const SkillCardHealthBar: StyledComponent<"div", any, IHealthBarProps> = styled.div`
  background-color: ${(props: IHealthBarProps) => props.active ? "blue" : "gray"};
  width: 20%;
  height: 100%;
`;

const SkillCardLabel: StyledComponent<"div", any, {}> = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    color: black;
    text-decoration: none;
  }
`;

const SkillCard: React.FC<IProps> = ({ name, id, active }: IProps): JSX.Element => {
  const body: JSX.Element =
    <SkillCardContainer>
      <StyledLink to={active ? `/skill/${id}` : "#"}>
        <SkillCardBody>
          <SkillCardHealthBar active={active} />
          <SkillCardLabel>
            {name}
          </SkillCardLabel>
        </SkillCardBody>
      </StyledLink>
    </SkillCardContainer>;

  return (
    body
  );
};

(SkillCard as any).whyDidYouRender = true;

export default SkillCard;
