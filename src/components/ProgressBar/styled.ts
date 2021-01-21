import styled from 'styled-components';

interface IProgressBarProps {
  width: number;
}

export const ProgressBar = styled.div`
  background-color: #20a8e9;
  background-image: none;
  height: 10px;
  width: ${({width}: IProgressBarProps) => width}%
  transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s;
`;
