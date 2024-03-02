import { type Http } from '~/framework/http/types/types.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { NotificationsApiPath } from './enums/enums.js';
import {
    type NotificationRequestDto,
    type NotificationResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class NotificationsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: NotificationsApiPath.ROOT, baseUrl, http, storage });
    }

    public async fetchNotifications(): Promise<Array<NotificationResponseDto>> {
        const response = await this.load(
            this.getFullEndpoint(NotificationsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: 'application/json',
                hasAuth: true,
            },
        );

        return await response.json();
    }

    public async createNotification(
        payload: NotificationRequestDto,
    ): Promise<NotificationResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(NotificationsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: 'application/json',
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json();
    }

    public async dismissNotification(notificationId: string): Promise<void> {
        await this.load(
            this.getFullEndpoint(
                `${NotificationsApiPath.DISMISS.replace(':notificationId', notificationId)}`,
                {},
            ),
            {
                method: 'PATCH',
                contentType: 'application/json',
                hasAuth: true,
                /* Body cannot be empty when content-type is set to 'application/json'*/
                payload: JSON.stringify({}),
            },
        );
    }

    public async deleteNotification(notificationId: string): Promise<void> {
        await this.load(
            this.getFullEndpoint(
                `${NotificationsApiPath.DELETE.replace(':notificationId', notificationId)}`,
                {},
            ),
            {
                method: 'DELETE',
                contentType: 'application/json',
                hasAuth: true,
            },
        );
    }

    public async getUnreadNotificationsCount(): Promise<number> {
        const response = await this.load(
            this.getFullEndpoint(NotificationsApiPath.UNREAD, {}),
            {
                method: 'GET',
                contentType: 'application/json',
                hasAuth: true,
            },
        );

        return await response.json();
    }
}

export { NotificationsApi };