import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { NotificationsApi } from './notifications-api.js';

const notificationApi = new NotificationsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { notificationApi };
