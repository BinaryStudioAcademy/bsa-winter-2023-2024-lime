import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { GoalsApi } from './goals-api.js';

const goalsApi = new GoalsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { goalsApi };
