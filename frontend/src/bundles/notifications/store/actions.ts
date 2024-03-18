import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type NotificationRequestDto,
    type NotificationResponseDto,
    type Paged,
} from '../types/types.js';
import { name } from './slice.js';

const fetchNotifications = createAsyncThunk<
    Paged<NotificationResponseDto>,
    undefined,
    AsyncThunkConfig
>(`${name}/fetchNotifications`, async (_, { extra }) => {
    const { notificationApi } = extra;
    return await notificationApi.fetchNotifications();
});

const createNotification = createAsyncThunk<
    NotificationResponseDto,
    NotificationRequestDto,
    AsyncThunkConfig
>(`${name}/createNotification`, async (notification, { extra }) => {
    const { notificationApi } = extra;
    return await notificationApi.createNotification(notification);
});

const dismissNotification = createAsyncThunk<number, number, AsyncThunkConfig>(
    `${name}/dismissNotification`,
    async (notificationId, { extra }) => {
        const { notificationApi } = extra;
        await notificationApi.dismissNotification(notificationId.toString());
        return notificationId;
    },
);

const deleteNotification = createAsyncThunk<number, number, AsyncThunkConfig>(
    `${name}/deleteNotification`,
    async (notificationId, { extra }) => {
        const { notificationApi } = extra;
        await notificationApi.deleteNotification(notificationId.toString());
        return notificationId;
    },
);

export {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
};
