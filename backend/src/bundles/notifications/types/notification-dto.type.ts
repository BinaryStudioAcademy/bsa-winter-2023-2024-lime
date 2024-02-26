import { type ValueOf } from 'shared';

import { type NotificationType } from './notification-type.type.js';

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

export { type NotificationRequestDto, type NotificationResponseDto };
