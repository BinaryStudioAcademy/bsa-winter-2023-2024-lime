import { type OAuthProvider } from '../oauth.js';
import { type ValueOf } from './types.js';

type OAuthConnection = {
    id: number;
    userId: number;
    tokenType: string;
    expiresAt: number;
    refreshToken: string;
    accessToken: string;
    scope: string;
    provider: ValueOf<typeof OAuthProvider>;
};

export { type OAuthConnection };
