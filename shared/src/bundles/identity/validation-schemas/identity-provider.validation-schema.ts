import { z } from 'zod';

import { IdentityProvider } from '../enums/enums.js';

const identityProviderValidationSchema = z.object({
    provider: z.nativeEnum(IdentityProvider),
});

export { identityProviderValidationSchema };
