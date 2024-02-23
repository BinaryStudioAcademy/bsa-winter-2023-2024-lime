import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/types/types.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { SubscriptionsApiPath } from './enums/enums.js';
import {
    type CancelSubscriptionRequestDto,
    type SubscribeRequestDto,
    type SubscribeResponseDto,
    type SubscriptionPlansGetAllResponseDto,
} from './types/types.js';

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

class SubscriptionsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.SUBSCRIPTIONS, baseUrl, http, storage });
    }

    public async createSubscription(
        payload: SubscribeRequestDto,
    ): Promise<SubscribeResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(SubscriptionsApiPath.SUBSCRIBE, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<SubscribeResponseDto>();
    }

    public async cancelSubscription(
        payload: CancelSubscriptionRequestDto,
    ): Promise<boolean> {
        const response = await this.load(
            this.getFullEndpoint(SubscriptionsApiPath.CANCEL_SUBSCRIPTION, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<boolean>();
    }
}

export { SubscriptionPlansApi, SubscriptionsApi };
