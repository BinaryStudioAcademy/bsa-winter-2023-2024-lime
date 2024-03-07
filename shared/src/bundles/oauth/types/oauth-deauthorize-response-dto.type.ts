import { type ValueOf } from '../../../types/types.js';
import { type OAuthProvider } from '../enums/enums.js';

type OAuthDeauthorizeResponseDto = {
  provider: ValueOf<typeof OAuthProvider>;
};

export { type OAuthDeauthorizeResponseDto };
