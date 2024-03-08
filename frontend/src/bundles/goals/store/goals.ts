import { createGoal, getGoals } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getGoals,
    createGoal,
};

export { allActions as actions };
export { reducer } from './slice.js';
