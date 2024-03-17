import {
    createSchedule,
    deleteSchedule,
    getSchedules,
    updateSchedule,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
};

export { allActions as actions };
export { reducer } from './slice.js';
