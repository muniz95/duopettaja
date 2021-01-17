import React from "react";
import "../../styles/ProgressBar.css";

const ProgressBar = ({progress = 0}) => {
  return (
    <React.Fragment>
      <div className="progress-bar bg-duopettaja" role="progressbar" style={{width: `${progress}%`}}
        aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      </div>
      <div>
        <span>{progress}%</span>
      </div>
    </React.Fragment>
  );
};

export default ProgressBar;
