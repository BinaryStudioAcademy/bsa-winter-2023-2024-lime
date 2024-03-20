import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { FriendsApi } from './friends-api.js';

const friendsApi = new FriendsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { friendsApi };
