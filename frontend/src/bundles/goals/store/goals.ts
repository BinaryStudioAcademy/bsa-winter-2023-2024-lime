import {
    createGoal,
    deleteGoal,
    getGoals,
    getGoalsByUserId,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getGoals,
    createGoal,
    getGoalsByUserId,
    deleteGoal,
};

export { allActions as actions };
export { reducer } from './slice.js';
