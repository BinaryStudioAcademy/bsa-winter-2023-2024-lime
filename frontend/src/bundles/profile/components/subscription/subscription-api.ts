import { ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/types/types.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type SubscriptionPlansGetAllResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class SubscriptionPlansApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: '/subscription-plans', baseUrl, http, storage });
    }

    public async getAllSubscriptionPlans(): Promise<SubscriptionPlansGetAllResponseDto> {
        const response = await this.load(this.getFullEndpoint('/', {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });

        return await response.json<SubscriptionPlansGetAllResponseDto>();
    }
}

type SubscribeOptions = {
    planId: number;
    userId: number;
    priceToken: string;
    customerToken: string;
};

type CancelSubscribeOptions = {
    userId: number;
};

class SubscriptionsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: '/subscriptions', baseUrl, http, storage });
    }

    public async createSubscription(
        payload: SubscribeOptions,
    ): Promise<{ subscriptionToken: string; clientSecret: string }> {
        const response = await this.load(
            this.getFullEndpoint('/subscribe', {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<{
            subscriptionToken: string;
            clientSecret: string;
        }>();
    }

    public async cancelSubscription(
        payload: CancelSubscribeOptions,
    ): Promise<{ isCanceled: boolean }> {
        const response = await this.load(
            this.getFullEndpoint('/cancel-subscription', {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<{ isCanceled: boolean }>();
    }
}

export { SubscriptionPlansApi, SubscriptionsApi };
