import {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
};

export { allActions as actions };
export { reducer } from './slice.js';
