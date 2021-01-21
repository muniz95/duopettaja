import React from "react";
import * as S from './styled';

const ProgressBar = ({progress = 0}) => {
  return (
    <React.Fragment>
      <S.ProgressBar role="progressbar" aria-valuenow={progress}
        aria-valuemin={0} aria-valuemax={100} width={progress}>
      </S.ProgressBar>
      <div>
        <span>{progress}%</span>
      </div>
    </React.Fragment>
  );
};

export default ProgressBar;
