import { type ValueOf } from '../../../types/types.js';
import { type NotificationType } from '../enums/enums.js';

type NotificationResponseDto = {
    id: number;
    title: string | null;
    message: string;
    isRead: boolean;
    type: ValueOf<typeof NotificationType>;
    createdAt: string | null;
};

export { type NotificationResponseDto };
