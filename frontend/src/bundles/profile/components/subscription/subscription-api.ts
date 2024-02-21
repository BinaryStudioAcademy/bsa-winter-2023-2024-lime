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

export { SubscriptionPlansApi };
