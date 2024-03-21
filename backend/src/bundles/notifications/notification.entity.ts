import { type ValueOf } from 'shared';

import { type Entity } from '~/common/types/entity.type.js';

import { NotificationType } from './notifications.js';

class NotificationEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'title': string | null;

    private 'message': string;

    private 'isRead': boolean;

    private 'type': ValueOf<typeof NotificationType>;

    private 'createdAt': string | null;

    private constructor({
        id,
        userId,
        title,
        message,
        isRead,
        type,
        createdAt,
    }: {
        id: number | null;
        userId: number;
        title: string | null;
        message: string;
        isRead: boolean;
        type: ValueOf<typeof NotificationType>;
        createdAt: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.isRead = isRead;
        this.type = type;
        this.createdAt = createdAt;
    }

    public static initialize({
        id,
        userId,
        title,
        message,
        isRead,
        type,
        createdAt,
    }: {
        id: number;
        userId: number;
        title: string | null;
        message: string;
        isRead: boolean;
        type: ValueOf<typeof NotificationType>;
        createdAt: string | null;
    }): NotificationEntity {
        return new NotificationEntity({
            id,
            userId,
            title,
            message,
            isRead,
            type,
            createdAt,
        });
    }

    public static initializeNew({
        userId,
        title,
        message,
        isRead,
        type,
        createdAt,
    }: {
        userId: number;
        title: string | null;
        message: string;
        isRead: boolean | null;
        type: ValueOf<typeof NotificationType> | null;
        createdAt?: string | null;
    }): NotificationEntity {
        return new NotificationEntity({
            id: null,
            userId,
            title,
            message,
            isRead: isRead ?? false,
            type: type ?? NotificationType.DEFAULT,
            createdAt: createdAt ?? null,
        });
    }

    public toObject(): {
        id: number;
        title: string | null;
        message: string;
        isRead: boolean;
        type: ValueOf<typeof NotificationType>;
        createdAt: string | null;
    } {
        return {
            id: this.id as number,
            title: this.title,
            message: this.message,
            isRead: this.isRead,
            type: this.type,
            createdAt: this.createdAt,
        };
    }

    public toNewObject(): {
        userId: number;
        title: string | null;
        message: string;
        isRead: boolean;
        type: ValueOf<typeof NotificationType>;
    } {
        return {
            userId: this.userId,
            title: this.title,
            message: this.message,
            isRead: this.isRead,
            type: this.type,
        };
    }
}

export { NotificationEntity };
