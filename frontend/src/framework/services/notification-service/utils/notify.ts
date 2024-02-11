import { toast } from 'react-toastify';

import { type INotify } from '../types/notification.type.js';
import { NotificationStatus } from '../types/notification-status.type.js';

const notify: INotify = ({ status = NotificationStatus.Default, message }) => {
    toast(message, { type: status });
};

export { notify };
