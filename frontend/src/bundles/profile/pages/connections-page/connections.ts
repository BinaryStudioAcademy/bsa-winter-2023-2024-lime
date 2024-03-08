import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { ConnectionApi } from './connections-api.js';

const connectionApi = new ConnectionApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { connectionApi };
