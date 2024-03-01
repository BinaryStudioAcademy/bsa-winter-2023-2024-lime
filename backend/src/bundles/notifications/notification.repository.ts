import { type Repository } from '~/common/types/repository.type.js';

import { NotificationEntity } from './notification.entity.js';
import { type NotificationModel } from './notification.model.js';

class NotificationRepository implements Repository {
    private notificationModel: typeof NotificationModel;

    public constructor(notificationModel: typeof NotificationModel) {
        this.notificationModel = notificationModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<NotificationEntity | null> {
        const notification = await this.notificationModel
            .query()
            .findOne(query)
            .execute();

        return notification
            ? NotificationEntity.initialize(notification)
            : null;
    }

    public async findAll({
        userId,
    }: {
        userId: number;
    }): Promise<NotificationEntity[]> {
        const notifications = await this.notificationModel
            .query()
            .where('userId', userId)
            .orderBy('isRead', 'asc')
            .orderBy('updatedAt', 'desc')
            .execute();

        return notifications.map((notification) =>
            NotificationEntity.initialize(notification),
        );
    }

    public async paginatedFind({
        userId,
        page,
        limit,
    }: {
        userId: number;
        page: number;
        limit: number;
    }): Promise<{ items: NotificationEntity[]; total: number }> {
        const allNotifications = await this.notificationModel
            .query()
            .where('userId', userId);

        const notifications = await this.notificationModel
            .query()
            .where('userId', userId)
            .orderBy('isRead', 'asc')
            .orderBy('updated_at', 'desc')
            .limit(limit)
            .offset((page - 1) * limit)
            .execute();

        const items = notifications.map((notification) =>
            NotificationEntity.initialize(notification),
        );

        return { items, total: allNotifications.length };
    }

    public async create(
        notificationData: NotificationEntity,
    ): Promise<NotificationEntity> {
        const notification = notificationData.toNewObject();

        const notificationEntity = await this.notificationModel
            .query()
            .insert(notification)
            .returning('*')
            .execute();

        return NotificationEntity.initialize(notificationEntity);
    }

    public async update(
        payload: Record<string, unknown>,
        notificationId: number,
    ): Promise<NotificationEntity> {
        const notification = await this.notificationModel
            .query()
            .patchAndFetchById(notificationId, payload)
            .returning('*');

        return NotificationEntity.initialize(notification);
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return Boolean(
            await this.notificationModel.query().where(query).del().execute(),
        );
    }
}

export { NotificationRepository };
