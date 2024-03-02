import { createSlice } from '@reduxjs/toolkit';

import { type NotificationType } from '../../common/components/header/components/notifications/types/notifications.types.js';
import {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
    fetchUnreadNotificationsCount,
} from './actions.js';

type State = {
    notifications: Array<NotificationType>;
};

const { reducer, actions, name } = createSlice({
    initialState: {
        notifications: [],
    } as State,
    name: 'notifications',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
            })
            .addCase(createNotification.fulfilled, (state, action) => {
                state.notifications.push(action.payload);
            })
            .addCase(dismissNotification.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter(
                    (notification) => notification.id !== action.payload.id,
                );
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter(
                    (notification) => notification.id !== action.payload.id,
                );
            })
            .addCase(
                fetchUnreadNotificationsCount.fulfilled,
                (state, action) => {
                    state.notifications = action.payload;
                },
            );
    },
});

export { type State, actions, name, reducer };
