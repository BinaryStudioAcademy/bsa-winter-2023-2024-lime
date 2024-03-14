import { config } from '~/common/config/config.js';

import { GoogleIdentityStrategy } from './google/google-identity-strategy.js';

const googleIdentityStrategy = new GoogleIdentityStrategy(config);

export { googleIdentityStrategy };
