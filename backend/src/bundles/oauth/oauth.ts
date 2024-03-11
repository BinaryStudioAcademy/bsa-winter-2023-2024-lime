import {
    googleFitOAuthStrategy,
    googleOAuthStrategy,
} from '~/bundles/google/google.js';
import { stravaOAuthStrategy } from '~/bundles/strava/strava.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { OAuthProvider } from './enums/enums.js';
import { OAuthController } from './oauth.controller.js';
import { OAuthModel } from './oauth.model.js';
import { OAuthRepository } from './oauth.repository.js';
import { OAuthService } from './oauth.service.js';
import { OAuthStateModel } from './oauth-state.model.js';
import { OAuthStateRepository } from './oauth-state.repository.js';

const oAuthStrategies = {
    [OAuthProvider.STRAVA]: stravaOAuthStrategy,
    [OAuthProvider.GOOGLE_FIT]: googleFitOAuthStrategy,
    [OAuthProvider.GOOGLE]: googleOAuthStrategy,
};

const oAuthStateRepository = new OAuthStateRepository(OAuthStateModel);
const oAuthRepository = new OAuthRepository(OAuthModel);
const oAuthService = new OAuthService({
    strategies: oAuthStrategies,
    oAuthStateRepository,
    oAuthRepository,
});
const oAuthController = new OAuthController(logger, oAuthService, config);

export {
    type OAuthExchangeAuthCodeDto,
    type OAuthStrategy,
} from './types/types.js';
export { oAuthController, oAuthService };
export {
    ErrorMessage,
    HttpCode,
    HttpError,
    OAuthActionsPath,
    OAuthInfoAttributes,
    OAuthProvider,
    OAuthStateAttributes,
} from './enums/enums.js';
export { OAuthEntity } from './oauth.entity.js';
export { OAuthModel } from './oauth.model.js';
export { OAuthRepository } from './oauth.repository.js';
export { OAuthService } from './oauth.service.js';
export { OAuthStateEntity } from './oauth-state.entity.js';
export { OAuthStateModel } from './oauth-state.model.js';
export { OAuthStateRepository } from './oauth-state.repository.js';
export {
    type OAuthClient,
    type OAuthResponseDto,
    type ProviderOAuthPaths,
} from './types/types.js';
