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
    notifications: [],
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
            return {
                ...state,
                notifications: action.payload,
                dataStatus: DataStatus.FULFILLED,
            };
        });
        builder.addCase(fetchNotifications.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(createNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(createNotification.fulfilled, (state, action) => {
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        });
        builder.addCase(createNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(dismissNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(dismissNotification.fulfilled, (state, action) => {
            return {
                ...state,
                notifications: state.notifications.map((notification) => {
                    if (notification.id.toString() === action.payload) {
                        return {
                            ...notification,
                            isRead: true,
                        };
                    }
                    return notification;
                }),
            };
        });
        builder.addCase(dismissNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(deleteNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteNotification.fulfilled, (state, action) => {
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) =>
                        notification.id.toString() !== action.payload,
                ),
            };
        });
        builder.addCase(deleteNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
