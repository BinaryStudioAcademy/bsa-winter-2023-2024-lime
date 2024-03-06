import { OAuthModel } from '~/bundles/oauth/oauth.model.js';
import { OAuthRepository } from '~/bundles/oauth/oauth.repository.js';
import { workoutService } from '~/bundles/workouts/workouts.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { StravaController } from './strava.controller.js';
import { StravaService } from './strava.service.js';
import { StravaOAuthStrategy } from './strava-oauth-strategy.js';

const oAuthRepository = new OAuthRepository(OAuthModel);
const stravaOAuthStrategy = new StravaOAuthStrategy(config);
const stravaService = new StravaService(workoutService, oAuthRepository);
const stravaController = new StravaController(logger, stravaService);

export { stravaController, stravaOAuthStrategy, stravaService };
