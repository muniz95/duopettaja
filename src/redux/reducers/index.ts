import { REACH_GOAL } from "../constants";
import { combineReducers } from "redux";

const goal = (state = "not finished", action) => {
  switch (action.type) {
    case REACH_GOAL:
      return "you have reached your daily goal!";
    default:
      return state;
  }
};

export default combineReducers({
  goal
});
