import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { SubscriptionPlansApi } from './subscription-api.js';

const subscriptionPlansApi = new SubscriptionPlansApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { subscriptionPlansApi };
