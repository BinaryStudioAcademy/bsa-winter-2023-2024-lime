import {
    OAuthModel,
    OAuthRepository,
    OAuthStateModel,
    OAuthStateRepository,
} from '~/bundles/connections/oauth/oauth.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { StravaController } from './strava.controller.js';
import { StravaService } from './strava.service.js';

const oAuthRepository = new OAuthRepository(OAuthModel);
const oAuthStateRepository = new OAuthStateRepository(OAuthStateModel);

const stravaService = new StravaService(oAuthRepository, oAuthStateRepository);
const stravaConfig = config.ENV.STRAVA;
const stravaController = new StravaController(
    logger,
    stravaService,
    stravaConfig,
);

export { stravaController };
