import { type NotificationStatus } from './notification-status.type.js';

interface NotificationArguments {
    message: string;
    status?: NotificationStatus;
}

type INotify = (ar: NotificationArguments) => void;

export { type INotify };
export { type NotificationArguments };
