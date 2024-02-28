import { config } from '~/common/config/config.js';

import { StravaOAuthStrategy } from './strava-oauth-strategy.js';

const stravaOAuthStrategy = new StravaOAuthStrategy(config);

export { stravaOAuthStrategy };
