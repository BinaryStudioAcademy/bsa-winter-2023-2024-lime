import { type TypeOptions, toast } from 'react-toastify';

import { NotificationType } from './enums/notification-type.enums.js';

type NotificationArguments = {
    message: string;
    type?: TypeOptions;
};

class NotificationManager {
    private notify({
        type = NotificationType.DEFAULT,
        message,
    }: NotificationArguments): void {
        toast(message, { type });
    }

    public success(message: string): void {
        this.notify({ type: NotificationType.SUCCESS, message });
    }

    public error(message: string): void {
        this.notify({ type: NotificationType.ERROR, message });
    }

    public info(message: string): void {
        this.notify({ type: NotificationType.INFO, message });
    }

    public warning(message: string): void {
        this.notify({ type: NotificationType.WARNING, message });
    }

    public default(message: string): void {
        this.notify({ type: NotificationType.DEFAULT, message });
    }
}

export { NotificationManager };
