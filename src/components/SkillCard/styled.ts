import { Link } from "react-router-dom";
import styled, { StyledComponent } from "styled-components";

interface IHealthBarProps {
  active: boolean;
}

export const SkillCardBody: StyledComponent<"div", any, {}> = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: row;
  width: 90%;
  border-style: solid;
  border-radius: 15px;
`;

export const SkillCardContainer: StyledComponent<"div", any, {}> = styled.div`
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

export const SkillCardHealthBar: StyledComponent<"div", any, IHealthBarProps> = styled.div`
  background-color: ${(props: IHealthBarProps) => props.active ? "blue" : "gray"};
  width: 20%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const SkillCardLabel: StyledComponent<"div", any, {}> = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    color: black;
    text-decoration: none;
  }
`;