import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchNotifications = createAsyncThunk('notifications/fetchNotifications',() => {
  //  const response = await fetch('/notifications');
  //  return response.json();
  // mock response
    return [
    {
        id: '202404',
        title: 'Notification 1',
        description: 'This is a description of the notification 1',
    },
    {
        id: '202401',
        title: 'Notification 2',
        description: 'This is a description of the notification 1',
    }
  ];
});

const createNotification = createAsyncThunk('notifications/createNotification', async (notification) => {
    const response = await fetch('/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
    });
    return response.json();
});

const dismissNotification = createAsyncThunk('notifications/dismissNotification', async (notificationId) => {
    const response = await fetch(`/notifications/${notificationId}/dismiss`, {
        method: 'PATCH',
    });
    return response.json();
});

const deleteNotification = createAsyncThunk('notifications/deleteNotification', async (notificationId) => {
    const response = await fetch(`/notifications/${notificationId}`, {
        method: 'DELETE',
    });
    return response.json();
});

const fetchUnreadNotificationsCount = createAsyncThunk('notifications/fetchUnreadNotificationsCount', async () => {
    const response = await fetch('/notifications/unread');
    return response.json();
});

export {
    createNotification,
    deleteNotification,
    dismissNotification,
    fetchNotifications,
    fetchUnreadNotificationsCount,
};
