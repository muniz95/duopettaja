/* eslint-disable no-unused-vars */
import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
// import { RootState } from "../redux/reducers";

const Header = () => {
  // const goal = useSelector((state: RootState) => state.goal);
  const [visible, setVisible] = React.useState(false);

  const switchMenu = () => {
    setVisible(!visible);
  };

  return (
    <nav>
      <header>
        <div>
          <div>
            <i className="fa fa-crown active">77</i>
          </div>
          <div>
            <i className="fa fa-fire active">98</i>
          </div>
          <div>
            <i className="fa fa-gem active">5600</i>
          </div>
          <div>
            <span onClick={switchMenu}>
              <i className="fa fa-ellipsis-h"></i>
              <div className={`arrow ${visible || 'hidden'}`}></div>
              <div className={`menu ${visible || 'hidden'}`}>
                <div className="backdrop"></div>
                <div className="menu__options">
                  <div className="menu__options__container">
                    <Link className="option" to="dictionary">Dictionary</Link>
                    <Link className="option" to="words">Words</Link>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default Header;
