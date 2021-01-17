import React from "react";
import Lesson from "../../models/Lesson";
import * as S from "./styled";

interface IProps {
  lesson: Lesson;
  current: number;
  total: number;
  children: JSX.Element;
}

const LessonCard: React.FC<IProps> = ({ lesson, current, total, children }: IProps) => {
  console.log(lesson);
  const body: JSX.Element =
    <S.SkillCardContainer>
      <S.SkillCardBody>
        <S.SkillCardHealthBar>
          {current}/{total}
        </S.SkillCardHealthBar>
        <S.SkillCardLabelContainer>
          <S.SkillCardLabel>
            {lesson.words.split('*').join(", ")}
          </S.SkillCardLabel>
          {children}
        </S.SkillCardLabelContainer>
      </S.SkillCardBody>
    </S.SkillCardContainer>;

  return body;
};

(LessonCard as any).whyDidYouRender = true;

export default LessonCard;
