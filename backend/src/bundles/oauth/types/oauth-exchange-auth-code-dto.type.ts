import { type OAuthType } from '../enums/enums.js';
import { type ValueOf } from './types.js';

type OAuthExchangeAuthCodeDto = {
    code: string;
    scope: string;
    state: string;
    userId: number;
    type: ValueOf<typeof OAuthType>;
};

export { type OAuthExchangeAuthCodeDto };
