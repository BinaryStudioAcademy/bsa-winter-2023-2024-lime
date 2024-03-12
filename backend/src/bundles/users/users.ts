import { OAuthModel, OAuthRepository } from '~/bundles/oauth/oauth.js';
import { logger } from '~/common/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const oAuthRepository = new OAuthRepository(OAuthModel);
const userService = new UserService(userRepository);

const userController = new UserController(logger, userService, oAuthRepository);

export { userController, userService };
export {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
    type UserUpdateProfileRequestDto,
} from './types/types.js';
export { UserEntity } from './user.entity.js';
export { UserModel } from './user.model.js';
export { UserService } from './user.service.js';
export {
    passwordForgotValidationSchema,
    passwordResetValidationSchema,
    userAuthValidationSchema,
    userUpdateProfileValidationSchema,
} from './validation-schemas/validation-schemas.js';
