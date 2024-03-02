import { createSlice } from '@reduxjs/toolkit';
import { NotificationType } from 'shared';

import { type NotificationResponseDto } from '../types/types.js';
import {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
} from './actions.js';

type State = {
    notifications: Array<NotificationResponseDto>;
};

const { reducer, actions, name } = createSlice({
    initialState: {
        notifications: [
            {
                id: 202_404,
                title: 'Notification 1',
                message: 'This is a description of the notification 1',
                isRead: false,
                type: NotificationType.DEFAULT,
            },
            {
                id: 202_401,
                title: 'Notification 2',
                message: 'This is a description of the notification 1',
                isRead: false,
                type: NotificationType.DEFAULT,
            },
        ],
    } as State,
    name: 'notifications',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.notifications = [...state.notifications, ...action.payload];
        });
        builder.addCase(createNotification.fulfilled, (state, action) => {
            state.notifications.push(action.payload);
        });
        builder.addCase(dismissNotification.fulfilled, (state, action) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id.toString() !== action.payload,
            );
        });
        builder.addCase(deleteNotification.fulfilled, (state, action) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id.toString() !== action.payload,
            );
        });
    },
});

export { type State, actions, name, reducer };
