import React from "react";
import { Link } from "react-router-dom";
// import "../../styles/Header.scss";
import * as S from "./styled";

const Header = () => {
  const [visible, setVisible] = React.useState(false);

  const switchMenu = () => {
    setVisible(!visible);
  };

  return (
    <S.Nav>
      <header>
        <div>
          <div>
            <S.Icon className="fa fa-crown active">77</S.Icon>
          </div>
          <div>
            <S.Icon className="fa fa-fire active">98</S.Icon>
          </div>
          <div>
            <S.Icon className="fa fa-gem active">5600</S.Icon>
          </div>
          <div>
            <span onClick={switchMenu}>
              <S.Icon className="fa fa-ellipsis-h"></S.Icon>
              <S.Arrow visible={visible} />
              <S.Menu visible={visible} >
                <S.Backdrop />
                <div className="menu__options">
                  <div className="menu__options__container">
                    <Link className="option" to="dictionary">Dictionary</Link>
                    <Link className="option" to="words">Words</Link>
                  </div>
                </div>
              </S.Menu>
            </span>
          </div>
        </div>
      </header>
    </S.Nav>
  );
}

export default Header;
