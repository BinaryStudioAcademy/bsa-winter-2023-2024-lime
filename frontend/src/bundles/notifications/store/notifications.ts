import { createNotification, fetchNotifications } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createNotification,
    fetchNotifications,
};

export { allActions as actions };
export { reducer } from './slice.js';
