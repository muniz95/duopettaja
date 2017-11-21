import { UPDATE_STREAK, REACH_GOAL } from '../constants';

const initialState = {
  goal: 'not finished'
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_STREAK:
      console.log(action);
      return action;
    case REACH_GOAL:
      return {
        goal: action.payload
      }
    default:
      return initialState;
  }
}

export default reducer;