import { type NotificationRequestDto } from '../notifications.js';

type CreateNotificationRequestDto = NotificationRequestDto & {
    userId: number;
};

export { type CreateNotificationRequestDto };
