import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
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
        super({ path: ApiPath.NOTIFICATIONS, baseUrl, http, storage });
    }

    public async fetchNotifications(): Promise<{        
        items: NotificationResponseDto[];
    }> {
        const response = await this.load(
            this.getFullEndpoint(NotificationsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
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
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json();
    }

    public async dismissNotification(notificationId: string): Promise<void> {
        await this.load(
            this.getFullEndpoint(NotificationsApiPath.DISMISS, {
                notificationId,
            }),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({}),
            },
        );
    }

    public async deleteNotification(notificationId: string): Promise<void> {
        await this.load(
            this.getFullEndpoint(NotificationsApiPath.DELETE, {
                notificationId,
            }),
            {
                method: 'DELETE',
                hasAuth: true,
            },
        );
    }

    public async getUnreadNotificationsCount(): Promise<number> {
        const response = await this.load(
            this.getFullEndpoint(NotificationsApiPath.UNREAD, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json();
    }
}

export { NotificationsApi };
