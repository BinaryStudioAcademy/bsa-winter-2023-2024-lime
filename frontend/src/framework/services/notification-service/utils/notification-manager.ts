import { toast } from 'react-toastify';

import { NotificationStatus } from '../enums/notification-status.enums.js';
import { type NotificationArguments } from '../types/notification.type.js';

class NotificationManager {
    private notify({
        status = NotificationStatus.Default,
        message,
    }: NotificationArguments): void {
        toast(message, { type: status });
    }

    public successNotify(message: string): void {
        this.notify({ status: NotificationStatus.Success, message });
    }

    public errorNotify(message: string): void {
        this.notify({ status: NotificationStatus.Error, message });
    }

    public infoNotify(message: string): void {
        this.notify({ status: NotificationStatus.Info, message });
    }

    public warningNotify(message: string): void {
        this.notify({ status: NotificationStatus.Warning, message });
    }

    public defaultNotify(message: string): void {
        this.notify({ status: NotificationStatus.Default, message });
    }
}

export { NotificationManager };
