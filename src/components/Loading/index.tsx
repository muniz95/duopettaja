/* eslint-disable no-unused-vars */
import React from "react";
import * as S from "./styled";
/* eslint-enable no-unused-vars */

const Loading = () => {
  return (
    <S.Loading>
      <i className="fa fa-spinner fa-spin" style={{fontSize: "100px", color: "#20a8e9"}}></i>
    </S.Loading>
  );
}

export default Loading;
