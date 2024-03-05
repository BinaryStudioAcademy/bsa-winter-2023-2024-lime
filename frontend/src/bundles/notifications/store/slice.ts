import { createSlice } from '@reduxjs/toolkit';

import { NotificationType } from '../temp-types/types.js';
import { type NotificationStateTypeSlice } from '../types/types.js';
import {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
} from './actions.js';

const State: NotificationStateTypeSlice = [
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
];

const { reducer, actions, name } = createSlice({
    initialState: State,
    name: 'notifications',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(createNotification.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(dismissNotification.fulfilled, (state, action) => {
            return state.filter(
                (notification) => notification.id.toString() !== action.payload,
            );
        });
        builder.addCase(deleteNotification.fulfilled, (state, action) => {
            return state.filter(
                (notification) => notification.id.toString() !== action.payload,
            );
        });
    },
});

export { type State, actions, name, reducer };
