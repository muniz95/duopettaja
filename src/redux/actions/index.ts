import { REACH_GOAL } from "../constants";

export const reachGoal = () => {
  const action = {
    type: REACH_GOAL,
  };
  return action;
};

export const login = () => {
  const action = {
    type: 'LOGIN',
  };
  return action;
}

export const logout = () => {
  const action = {
    type: 'LOGOUT',
  };
  return action;
}

const actions = {
  reachGoal,
  login,
  logout,
};

export default actions;
