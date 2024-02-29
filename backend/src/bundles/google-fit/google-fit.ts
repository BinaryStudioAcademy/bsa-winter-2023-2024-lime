import { config } from '~/common/config/config.js';

import { GoogleFitOAuthStrategy } from './google-fit-oauth-strategy.js';

const googleFitOAuthStrategy = new GoogleFitOAuthStrategy(config);

export { googleFitOAuthStrategy };
