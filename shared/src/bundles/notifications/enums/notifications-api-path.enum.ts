const NotificationsApiPath = {
    ROOT: '/',
    DISMISS: '/:notificationId/dismiss',
    DELETE: '/:notificationId',
    UNREAD: '/unread',
} as const;

export { NotificationsApiPath };
