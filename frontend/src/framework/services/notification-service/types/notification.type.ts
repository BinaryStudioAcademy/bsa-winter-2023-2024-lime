import { type NotificationStatus } from '../enums/notification-status.enums.js';

interface NotificationArguments {
    message: string;
    status?: NotificationStatus;
}

export { type NotificationArguments };
