import { type ValueOf } from '../../../types/types.js';
import { type NotificationType } from '../enums/enums.js';

type NotificationRequestDto = {
    title: string | null;
    message: string;
    isRead: boolean | null;
    type: ValueOf<typeof NotificationType> | null;
};

export { type NotificationRequestDto };
