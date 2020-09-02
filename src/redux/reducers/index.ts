import { combineReducers } from "redux";
import { REACH_GOAL } from "../constants";

interface IAction {
  type: string;
  payload: any;
}

const goal = (state = "not finished", action: IAction) => {
  switch (action.type) {
    case REACH_GOAL:
      return "you have reached your daily goal!";
    default:
      return state;
  }
};

const reducer = combineReducers({
  goal,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
