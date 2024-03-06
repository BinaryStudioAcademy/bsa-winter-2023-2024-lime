import { getWorkouts } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getWorkouts,
};

export { allActions as actions };
export { reducer } from './slice.js';
