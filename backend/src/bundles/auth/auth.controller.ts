import { type UserAuthRequestDto } from '~/bundles/users/users.js';
import { userAuthValidationSchema } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enums.js';

class AuthController extends BaseController {
    private authService: AuthService;

    public constructor(logger: Logger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            validation: {
                body: userAuthValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        query: { referralCode: string };
                        body: UserAuthRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.SIGN_IN,
            method: 'POST',
            validation: {
                body: userAuthValidationSchema,
            },
            handler: (options) =>
                this.signIn(
                    options as ApiHandlerOptions<{
                        body: UserAuthRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/auth/sign-in:
     *    post:
     *      tags:
     *        - Auth
     *      description: This endpoint authenticates a user by verifying their credentials
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
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  user:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     *                  token:
     *                    type: string
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                    type: object
     *                    $ref: '#/components/schemas/Error'
     */

    private async signIn(
        options: ApiHandlerOptions<{
            body: UserAuthRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.authService.signIn(options.body),
        };
    }

    /**
     * @swagger
     * /api/v1/auth/sign-up:
     *    post:
     *      tags:
     *         - Auth
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
     *                  user:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     *                  token:
     *                    type: string
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                    type: object
     *                    $ref: '#/components/schemas/Error'
     */
    private async signUp(
        options: ApiHandlerOptions<{
            query: { referralCode: string };
            body: UserAuthRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.CREATED,
            payload: await this.authService.signUp(
                options.body,
                options.query.referralCode,
            ),
        };
    }
}

export { AuthController };
