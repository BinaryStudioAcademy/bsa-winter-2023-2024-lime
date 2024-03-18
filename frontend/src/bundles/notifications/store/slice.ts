import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import { type NotificationStateTypeSlice } from '../types/types.js';
import {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
} from './actions.js';

const State: NotificationStateTypeSlice = {
    notifications: {
        items: [],
    },
    dataStatus: DataStatus.IDLE,
    isRefreshing: false,
};

const { reducer, actions, name } = createSlice({
    initialState: State,
    name: 'notifications',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            const { items } = action.payload;
            state.notifications.items = items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(fetchNotifications.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(createNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(createNotification.fulfilled, (state, action) => {
            state.notifications.items.push(action.payload);
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(createNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(dismissNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(dismissNotification.fulfilled, (state, action) => {
            state.notifications.items = state.notifications.items.map(
                (notification) => {
                    if (notification.id === action.payload) {
                        return {
                            ...notification,
                            isRead: true,
                        };
                    }
                    return notification;
                },
            );
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(dismissNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(deleteNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteNotification.fulfilled, (state, action) => {
            state.notifications.items = state.notifications.items.filter(
                (notification) => notification.id !== action.payload,
            );
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(deleteNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
