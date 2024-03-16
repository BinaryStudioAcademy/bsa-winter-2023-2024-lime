import { createSchedule, getSchedules } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getSchedules,
    createSchedule,
};

export { allActions as actions };
export { reducer } from './slice.js';
