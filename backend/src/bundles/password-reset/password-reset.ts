import { userService } from '~/bundles/users/users.js';
import { logger } from '~/common/logger/logger.js';

import { PasswordResetController } from './password-reset.controller.js';
import { PasswordResetService } from './password-reset.service.js';

const passwordResetService = new PasswordResetService(userService);

const passwordResetController = new PasswordResetController(
    logger,
    passwordResetService,
);

export {
    type PasswordForgotRequestDto,
    type PasswordForgotResponseDto,
    type PasswordResetRequestDto,
    type PasswordResetResponseDto,
} from './types/types.js';
export { passwordResetController, passwordResetService };
export { createPasswordResetLink } from './helpers/helpers.js';
