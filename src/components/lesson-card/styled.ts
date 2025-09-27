import styled, { StyledComponent } from "styled-components";

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
  @media (max-width: 768px) {
    width: 50%;
  }
  width: 25%;
`;

export const SkillCardHealthBar: StyledComponent<"div", any, {}> = styled.div`
  background-color: blue;
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const SkillCardLabelContainer: StyledComponent<"div", any, {}> = styled.div`
  height: 100%  
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: column;
`;

export const SkillCardLabel: StyledComponent<"div", any, {}> = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;