import { oAuthStateRepository } from '~/bundles/oauth/oauth.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { IdentityProvider } from './enums/enums.js';
import { IdentityController } from './identity.controller.js';
import { IdentityService } from './identity.service.js';
import { googleIdentityStrategy } from './strategies/strategies.js';

const identityStrategies = {
    [IdentityProvider.GOOGLE]: googleIdentityStrategy,
};

const identityService = new IdentityService({
    strategies: identityStrategies,
    oAuthStateRepository,
});
const identityController = new IdentityController(
    logger,
    identityService,
    config,
);

export { identityController };
export {
    IDENTITY_TOKEN_ADDITIONAL,
    IDENTITY_TOKEN_EXPIRATION,
} from './constants/constants.js';
export {
    ErrorMessage,
    HttpCode,
    HttpError,
    IdentityActionsPath,
    IdentityProvider,
} from './enums/enums.js';
export { IdentityService } from './identity.service.js';
export {
    type IdentityExchangeAuthCodeDto,
    type IdentityStrategy,
} from './types/types.js';
export { OAuthStateEntity, OAuthStateModel } from '~/bundles/oauth/oauth.js';
