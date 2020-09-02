/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { RootState } from "../redux/reducers";

const Header = () => {
  const goal = useSelector((state: RootState) => state.goal);
  return (
    <nav>
      <header>
        <span>
          <Link to={"/"}>
            <button className="link-main">Duopettaja</button>
          </Link>
        </span>
      </header>
      <div>
        <div>
          <span>Goal: {goal}</span>
        </div>
      </div>
    </nav>
  );
}

export default Header;
