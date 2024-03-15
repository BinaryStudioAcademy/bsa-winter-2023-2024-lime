import { type OAuthRepository } from '~/bundles/oauth/oauth.js';
import { type UserBonusService } from '~/bundles/user-bonuses/user-bonus.service.js';
import { type Logger } from '~/common/logger/logger.js';

import { type UserService } from '../user.service.js';

type UserControllerProperties = {
    logger: Logger;
    userService: UserService;
    oAuthRepository: OAuthRepository;
    userBonusService: UserBonusService;
};

export { type UserControllerProperties };
