import React from "react";
import * as S from "./styled";

interface IProps {
  name: string;
  id: number;
  active: boolean;
}

const SkillCard: React.FC<IProps> = ({ name, id, active }: IProps): JSX.Element => {
  const body: JSX.Element =
    <S.SkillCardContainer>
      <S.StyledLink to={active ? `/skill/${id}` : "#"}>
        <S.SkillCardBody>
          <S.SkillCardHealthBar active={active} />
          <S.SkillCardLabel>
            {name}
          </S.SkillCardLabel>
        </S.SkillCardBody>
      </S.StyledLink>
    </S.SkillCardContainer>;

  return (
    body
  );
};

(SkillCard as any).whyDidYouRender = true;

export default SkillCard;
