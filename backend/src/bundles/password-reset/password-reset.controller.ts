import {
    type PasswordForgotRequestDto,
    type PasswordResetRequestDto,
} from '~/bundles/password-reset/password-reset.js';
import {
    passwordForgotValidationSchema,
    passwordResetValidationSchema,
} from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { PasswordResetApiPath } from './enums/enums.js';
import { type PasswordResetService } from './password-reset.service.js';

class PasswordResetController extends BaseController {
    private passwordResetService: PasswordResetService;

    public constructor(
        logger: Logger,
        passwordResetService: PasswordResetService,
    ) {
        super(logger, ApiPath.AUTH);
        this.passwordResetService = passwordResetService;
        this.addRoute({
            path: PasswordResetApiPath.FORGOT_PASSWORD,
            method: 'POST',
            isPublic: true,
            validation: {
                body: passwordForgotValidationSchema,
            },
            handler: (options) =>
                this.forgotPassword(
                    options as ApiHandlerOptions<{
                        body: PasswordForgotRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: PasswordResetApiPath.RESET_PASSWORD,
            method: 'POST',
            isPublic: true,
            validation: {
                body: passwordResetValidationSchema,
            },
            handler: (options) =>
                this.resetPassword(
                    options as ApiHandlerOptions<{
                        body: PasswordResetRequestDto;
                    }>,
                ),
        });
    }

    private async forgotPassword(
        options: ApiHandlerOptions<{
            body: PasswordForgotRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.passwordResetService.forgotPassword(
                options.body,
            ),
        };
    }

    private async resetPassword(
        options: ApiHandlerOptions<{
            body: PasswordResetRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.passwordResetService.resetPassword(
                options.body,
            ),
        };
    }

    /**
     * @swagger
     * /auth/sign-up:
     *    post:
     *      description: Sign up user into the application
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     */
}

export { PasswordResetController };
