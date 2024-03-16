import { getSchedules } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getSchedules,
};

export { allActions as actions };
export { reducer } from './slice.js';
