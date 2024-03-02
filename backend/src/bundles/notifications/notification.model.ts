import { type ValueOf } from 'shared';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type NotificationType } from './notifications.js';

class NotificationModel extends AbstractModel {
    public 'userId': number;

    public 'message': string;

    public 'isRead': boolean;

    public 'title': string | null;

    public 'type': ValueOf<typeof NotificationType>;

    public static override get tableName(): string {
        return DatabaseTableName.NOTIFICATIONS;
    }
}

export { NotificationModel };
