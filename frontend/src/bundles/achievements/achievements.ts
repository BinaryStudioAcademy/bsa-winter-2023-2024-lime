import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { AchievementsApi } from './achievements-api.js';

const achievementsApi = new AchievementsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { achievementsApi };
