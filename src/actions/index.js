import { REACH_GOAL } from '../constants';

export const reachGoal = () => {
    const action = {
        type: REACH_GOAL,
        payload: 'you have reached your daily goal!'
    }
    console.log('action in reachGoal', action);
    return action;
}