import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { UserApi } from './users-api.js';

const userApi = new UserApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { userApi };
export {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
    type UserGetAllItemResponseDto,
    type UserGetAllResponseDto,
} from './types/types.js';
export {
    userAuthValidationSchema,
    userSignUpValidationSchema,
    UserValidationMessage,
} from './validation-schemas/validation-schemas.js';
