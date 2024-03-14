import { OAuthModel } from '~/bundles/oauth/oauth.model.js';
import { OAuthRepository } from '~/bundles/oauth/oauth.repository.js';
import {
    WorkoutModel,
    WorkoutRepository,
} from '~/bundles/workouts/workouts.js';
import { config } from '~/common/config/config.js';

import { GoogleFitService } from './google-fit.service.js';
import { GoogleFitOAuthStrategy } from './google-fit-oauth-strategy.js';

const oAuthRepository = new OAuthRepository(OAuthModel);
const workoutRepository = new WorkoutRepository(WorkoutModel);
const googleFitService = new GoogleFitService(
    config,
    oAuthRepository,
    workoutRepository,
);
const googleFitOAuthStrategy = new GoogleFitOAuthStrategy(config);

export { googleFitOAuthStrategy, googleFitService };
