import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type NotificationRequestDto,
    type NotificationResponseDto,
} from '../types/types.js';
import { name } from './slice.js';

const fetchNotifications = createAsyncThunk<
    NotificationResponseDto[],
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

export { createNotification, fetchNotifications };
