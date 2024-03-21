import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { ChatsApi } from './chats-api.js';

const chatsApi = new ChatsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { chatsApi };
