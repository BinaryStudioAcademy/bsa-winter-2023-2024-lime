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
    ApiHandlerResponseType,
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
            validation: {
                body: passwordForgotValidationSchema,
            },
            handler: (options) =>
                this.forgotPassword(
                    options as ApiHandlerOptions<{
                        body: PasswordForgotRequestDto;
                        origin: string;
                    }>,
                ),
        });
        this.addRoute({
            path: PasswordResetApiPath.RESET_PASSWORD,
            method: 'PUT',
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

    /**
     * @swagger
     * /api/v1/auth/forgot-password:
     *    post:
     *      tags:
     *        - Forgot
     *      description: This endpoint requests link for password reset
     *      requestBody:
     *        description: Password forgot data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: string
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                    type: object
     *                    $ref: '#/components/schemas/Error'
     */

    private async forgotPassword(
        options: ApiHandlerOptions<{
            body: PasswordForgotRequestDto;
            origin: string;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.passwordResetService.forgotPassword(
                options.body,
                options.origin,
            ),
        };
    }

    /**
     * @swagger
     * /api/v1/auth/reset-password:
     *    post:
     *      tags:
     *        - Reset
     *      description: This endpoint resets password
     *      requestBody:
     *        description: Password reset data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                properties:
     *                id:
     *                  type: number
     *                token:
     *                  type: string
     *                password:
     *                  type: string
     *                passwordConfirm:
     *                  type: string
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: string
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                    type: object
     *                    $ref: '#/components/schemas/Error'
     */

    private async resetPassword(
        options: ApiHandlerOptions<{
            body: PasswordResetRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.passwordResetService.resetPassword(
                options.body,
            ),
        };
    }
}

export { PasswordResetController };
