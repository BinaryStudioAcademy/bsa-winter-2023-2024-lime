import { createGoal, getGoals, getGoalsByUserId } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getGoals,
    createGoal,
    getGoalsByUserId,
};

export { allActions as actions };
export { reducer } from './slice.js';
