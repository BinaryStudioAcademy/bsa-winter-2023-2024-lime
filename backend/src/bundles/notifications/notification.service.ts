import { HttpCode, HttpError } from 'shared';

import { type Service } from '~/common/types/service.type.js';

import { NotificationEntity } from './notification.entity.js';
import { type NotificationRepository } from './notification.repository.js';
import { type NotificationResponseDto, type Paged } from './notifications.js';
import { type CreateNotificationRequestDto } from './types/types.js';

class NotificationService implements Service {
    private notificationRepository: NotificationRepository;

    public constructor(notificationRepository: NotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public async create(
        notificationData: CreateNotificationRequestDto,
    ): Promise<NotificationResponseDto> {
        const notification = await this.notificationRepository.create(
            NotificationEntity.initializeNew(notificationData),
        );

        return notification.toObject();
    }

    public async findAll({
        userId,
    }: {
        userId: number;
    }): Promise<{ items: NotificationResponseDto[] }> {
        const items = await this.notificationRepository.findAll({ userId });

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async paginatedFind({
        userId,
        page,
        limit,
    }: {
        userId: number;
        page: number;
        limit: number;
    }): Promise<Paged<NotificationResponseDto>> {
        const data = await this.notificationRepository.paginatedFind({
            userId,
            page,
            limit,
        });

        return { ...data, items: data.items.map((it) => it.toObject()) };
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public find(): ReturnType<Service['find']> {
        return Promise.resolve(null);
    }

    public async dismiss(
        notificationId: string,
        userId: number,
    ): Promise<NotificationResponseDto> {
        const notification = await this.notificationRepository.find({
            id: notificationId,
        });

        if (!notification || notification.toNewObject().userId !== userId) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: 'Notification was not found',
            });
        }

        const updatedNotification = await this.notificationRepository.update(
            {
                isRead: true,
            },
            notification.toObject().id,
        );

        return updatedNotification.toObject();
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return this.notificationRepository.delete(query);
    }
}

export { NotificationService };
