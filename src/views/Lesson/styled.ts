import styled from 'styled-components';

interface ICheckButtonProps {
  isCorrect: boolean;
  isVisible?: boolean;
};

export const LessonContainer = styled.div`
  // margin: 0 10px;
  height: 100%;
  justify-content: center;
`;

export const CheckButtonRow = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  // margin: 20px;
  position: fixed;
  bottom: 80px;
  z-index: 1;

  button {
    width: 25%;
    background-color: ${({isCorrect}: ICheckButtonProps) => isCorrect ? 'green' : 'red'}
    color: white;
    font-weight: bold;
  }
`;

export const SuccessBox = styled.div`
  position: fixed;
  bottom: ${({isVisible}) => isVisible ? '0px' : '-230px'};
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 230px;
  justify-content: flex-start;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({isCorrect}: ICheckButtonProps) => isCorrect ? 'limegreen' : '#cd3232'};
  transition: bottom .3s ease;
`;

export const ProgressBarRow = styled.div`
  display: flex;
  flex-flow: column;
  margin: 20px;
`;
