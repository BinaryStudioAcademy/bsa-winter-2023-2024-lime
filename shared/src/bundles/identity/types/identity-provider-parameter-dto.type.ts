import { type ValueOf } from '../../../types/types.js';
import { type IdentityProvider } from '../enums/enums.js';

type IdentityProviderParameterDto = {
    provider: ValueOf<typeof IdentityProvider>;
};

export { type IdentityProviderParameterDto };
