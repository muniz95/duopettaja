import React from "react";
import styled, { StyledComponent } from "styled-components";
import Lesson from "../models/Lesson";

interface IProps {
  lesson: Lesson;
  current: number;
  total: number;
  children: JSX.Element;
}

const SkillCardBody: StyledComponent<"div", any, {}> = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: row;
  width: 90%;
  border-style: solid;
  border-radius: 15px;
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

const SkillCardHealthBar: StyledComponent<"div", any, {}> = styled.div`
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

const SkillCardLabelContainer: StyledComponent<"div", any, {}> = styled.div`
  height: 100%  
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
`;

const SkillCardLabel: StyledComponent<"div", any, {}> = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LessonCard: React.FC<IProps> = ({ lesson, current, total, children }: IProps) => {
  console.log(lesson);
  const body: JSX.Element =
    <SkillCardContainer>
      <SkillCardBody>
        <SkillCardHealthBar>
          {current}/{total}
        </SkillCardHealthBar>
        <SkillCardLabelContainer>
          <SkillCardLabel>
            {lesson.words.split('*').join(", ")}
          </SkillCardLabel>
          {children}
        </SkillCardLabelContainer>
      </SkillCardBody>
    </SkillCardContainer>;

  return body;
};

(LessonCard as any).whyDidYouRender = true;

export default LessonCard;
