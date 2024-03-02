import {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
    fetchUnreadNotificationsCount,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
    fetchUnreadNotificationsCount,
};

export { reducer } from './slice.js';
export { allActions as actions };