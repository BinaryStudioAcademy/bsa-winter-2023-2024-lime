import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { MessagesApi } from './messages-api.js';

const messageApi = new MessagesApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { messageApi };
