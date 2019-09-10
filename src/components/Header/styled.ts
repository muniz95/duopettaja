import styled from "styled-components";

export const Nav = styled.nav`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 10px 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom-color: #80808040;
  border-bottom-style: solid;
`;

export const ItemsContainer = styled.ul`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const Flag = styled.li``;

export const Crown = styled.li``;

export const Streak = styled.li``;

export const Lingots = styled.li``;

export default {
  Crown,
  Flag,
  ItemsContainer,
  Lingots,
  Nav,
  Streak,
};
