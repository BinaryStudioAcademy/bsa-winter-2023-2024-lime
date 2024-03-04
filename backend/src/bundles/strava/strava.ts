import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { StravaController } from './strava.controller.js';
import { StravaOAuthStrategy } from './strava-oauth-strategy.js';

const stravaOAuthStrategy = new StravaOAuthStrategy(config);
const stravaController = new StravaController(logger);

export { stravaController,stravaOAuthStrategy };
