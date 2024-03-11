import { config } from '~/common/config/config.js';

import { GoogleFitOAuthStrategy } from './google-fit-oauth-strategy.js';
import { GoogleOAuthStrategy } from './google-oauth-strategy.js';

const googleFitOAuthStrategy = new GoogleFitOAuthStrategy(config);
const googleOAuthStrategy = new GoogleOAuthStrategy(config);

export { googleFitOAuthStrategy, googleOAuthStrategy };
