import { REACH_GOAL } from "../constants";

export const reachGoal = () => {
  const action = {
    type: REACH_GOAL,
  };
  return action;
};
