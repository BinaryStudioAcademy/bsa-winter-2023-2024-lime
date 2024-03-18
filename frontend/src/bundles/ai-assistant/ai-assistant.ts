import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { AiAssistantApi } from './ai-assistant-api.js';

const aiAssistantApi = new AiAssistantApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { aiAssistantApi };
