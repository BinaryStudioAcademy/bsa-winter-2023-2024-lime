import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { ScheduleApi } from './schedules-api.js';

const scheduleApi = new ScheduleApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { scheduleApi };
