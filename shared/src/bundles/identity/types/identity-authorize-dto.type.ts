import { type ValueOf } from '../../../types/types.js';
import { type IdentityProvider } from '../enums/enums.js';

type IdentityAuthorizeDto = {
    provider: ValueOf<typeof IdentityProvider>;
    referralCode: string | null;
};

export { type IdentityAuthorizeDto };
