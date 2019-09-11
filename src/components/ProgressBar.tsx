import React from "react";
import styled, { StyledComponent } from "styled-components";
import "../styles/ProgressBar.css";

interface IProps {
  progress: number;
}

const ProgressBarContainer: StyledComponent<"div", any, {}> = styled.div`
  span {
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const Bar: StyledComponent<"div", any, IProps> = styled.div`
  background-color: #20a8e9;
  background-image: none;
  width: ${(p: IProps) => `${p.progress}%`};
  height: 20px;
  transition: 0.4s ease-in-out;
  transition-property: width, background-color;
`;

const ProgressBar: React.FC<IProps> = ({progress = 0}: IProps): JSX.Element =>
  <ProgressBarContainer>
    <span>{progress}%</span>
    <Bar progress={progress} />
  </ProgressBarContainer>;

export default ProgressBar;
