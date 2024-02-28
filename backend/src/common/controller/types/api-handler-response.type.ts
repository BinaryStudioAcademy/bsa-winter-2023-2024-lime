import { type HttpCode } from '~/common/http/http.js';
import { type ValueOf } from '~/common/types/types.js';

import { type ApiHandlerResponseType } from '../enums/enums.js';

type ApiHandlerRedirectResponse = {
    type: typeof ApiHandlerResponseType.REDIRECT;
    status: ValueOf<typeof HttpCode>;
    redirectUrl: string;
};

type ApiHandlerDataResponse = {
    type: typeof ApiHandlerResponseType.DATA;
    status: ValueOf<typeof HttpCode>;
    payload: unknown;
};

type ApiHandlerResponse = ApiHandlerDataResponse | ApiHandlerRedirectResponse;

export { type ApiHandlerResponse };
