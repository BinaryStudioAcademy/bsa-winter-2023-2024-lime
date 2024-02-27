import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { PasswordResetApi } from './password-reset-api.js';

const passwordResetApi = new PasswordResetApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { passwordResetApi };
