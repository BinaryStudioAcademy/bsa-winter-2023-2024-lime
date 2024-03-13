import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import { type NotificationStateTypeSlice } from '../types/types.js';
import { createNotification, fetchNotifications } from './actions.js';

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
            state.notifications = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(fetchNotifications.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(createNotification.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(createNotification.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.notifications = [...state.notifications, action.payload];
        });
        builder.addCase(createNotification.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { type State, actions, name, reducer };
