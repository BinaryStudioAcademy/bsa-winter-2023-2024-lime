import { type ValueOf } from 'shared';

const NotificationType = {
    DEFAULT: 'default',
} as const;

export { NotificationType };

type NotificationRequestDto = {
    title: string;
    message: string;
    isRead: boolean;
    type: ValueOf<typeof NotificationType>;
};

type NotificationResponseDto = {
    id: number;
    title: string;
    message: string;
    isRead: boolean;
    type: ValueOf<typeof NotificationType>;
};

const NotificationsApiPath = {
    ROOT: '/',
    DISMISS: '/:notificationId/dismiss',
    DELETE: '/:notificationId',
    UNREAD: '/unread',
} as const;

export { NotificationsApiPath };
export { type NotificationRequestDto, type NotificationResponseDto };
