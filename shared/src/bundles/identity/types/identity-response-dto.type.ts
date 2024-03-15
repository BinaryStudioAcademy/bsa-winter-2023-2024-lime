import { type ValueOf } from '../../../types/types.js';
import { type IdentityProvider } from '../enums/enums.js';

type IdentityResponseDto = {
    id: number;
    scope: string;
    provider: ValueOf<typeof IdentityProvider>;
};

export { type IdentityResponseDto };
