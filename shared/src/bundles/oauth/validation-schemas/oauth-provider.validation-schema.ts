import { z } from 'zod';

import { OAuthProvider } from '../enums/enums.js';

const oAuthConnectionProvider = {
    STRAVA: OAuthProvider.STRAVA,
    GOOGLE_FIT: OAuthProvider.GOOGLE_FIT,
} as const;

const oAuthIdentityProvider = {
    GOOGLE: OAuthProvider.GOOGLE,
} as const;

const oAuthProviderValidationSchema = z.object({
    provider: z.nativeEnum(OAuthProvider),
});

const oAuthConnectionProviderValidationSchema = z.object({
    provider: z.nativeEnum(oAuthConnectionProvider),
});

const oAuthIdentityProviderValidationSchema = z.object({
    provider: z.nativeEnum(oAuthIdentityProvider),
});

export {
    oAuthConnectionProviderValidationSchema,
    oAuthIdentityProviderValidationSchema,
    oAuthProviderValidationSchema,
};
