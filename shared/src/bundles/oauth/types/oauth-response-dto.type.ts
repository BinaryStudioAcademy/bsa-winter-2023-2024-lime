import { type ValueOf } from '../../../types/types.js';
import { type OAuthProvider } from '../enums/enums.js';

type OAuthResponseDto = {
    id: number;
    userId: number;
    scope: string;
    provider: ValueOf<typeof OAuthProvider>;
};

export { type OAuthResponseDto };
