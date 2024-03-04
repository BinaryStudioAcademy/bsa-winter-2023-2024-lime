import { createAsyncThunk } from '@reduxjs/toolkit';

import { notificationApi } from '../notifications.js';
import { type NotificationRequestDto } from '../types/types.js';

const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        return await notificationApi.fetchNotifications();
    },
);

const createNotification = createAsyncThunk(
    'notifications/createNotification',
    async (notification: NotificationRequestDto) => {
        return await notificationApi.createNotification(notification);
    },
);

const dismissNotification = createAsyncThunk(
    'notifications/dismissNotification',
    async (notificationId: string) => {
        await notificationApi.dismissNotification(notificationId);
        return notificationId;
    },
);

const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async (notificationId: string) => {
        await notificationApi.deleteNotification(notificationId);
        return notificationId;
    },
);

export {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
};
