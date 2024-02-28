import { z } from 'zod';

import { OAuthProvider } from '../enums/enums.js';

const oAuthProviderValidationSchema = z.object({
    provider: z.nativeEnum(OAuthProvider),
});

export { oAuthProviderValidationSchema };
