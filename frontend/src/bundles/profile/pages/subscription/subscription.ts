import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { SubscriptionApi } from './subscription-api.js';

const subscriptionApi = new SubscriptionApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { subscriptionApi };
