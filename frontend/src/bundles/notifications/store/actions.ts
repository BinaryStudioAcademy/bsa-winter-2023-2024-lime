import { createAsyncThunk } from '@reduxjs/toolkit';

import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { NotificationsApi } from '../notifications-api.js';
import { type NotificationRequestDto } from '../types/types.js';

const notificationsApi = new NotificationsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const notifications = await notificationsApi.fetchNotifications();
        return notifications.filter((notification) => !notification.isRead);
    },
);

const createNotification = createAsyncThunk(
    'notifications/createNotification',
    async (notification: NotificationRequestDto) => {
        return await notificationsApi.createNotification(notification);
    },
);

const dismissNotification = createAsyncThunk(
    'notifications/dismissNotification',
    async (notificationId: string) => {
        await notificationsApi.dismissNotification(notificationId);
        return notificationId;
    },
);

const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async (notificationId: string) => {
        await notificationsApi.deleteNotification(notificationId);
        return notificationId;
    },
);

export {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
};
