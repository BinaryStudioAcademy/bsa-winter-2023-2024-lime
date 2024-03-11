import { OAuthModel } from '~/bundles/oauth/oauth.model.js';
import { OAuthRepository } from '~/bundles/oauth/oauth.repository.js';
import { WorkoutModel, WorkoutRepository } from '~/bundles/workouts/workouts.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { GoogleFitController } from './google-fit.controller.js';
import { GoogleFitService } from './google-fit.service.js';
import { GoogleFitOAuthStrategy } from './google-fit-oauth-strategy.js';

const oAuthRepository = new OAuthRepository(OAuthModel);
const workoutRepository = new WorkoutRepository(WorkoutModel);
const googleFitService = new GoogleFitService(config, oAuthRepository, workoutRepository);
const googleFitController = new GoogleFitController(logger, googleFitService);
const googleFitOAuthStrategy = new GoogleFitOAuthStrategy(config);

export { googleFitController, googleFitOAuthStrategy, googleFitService };
