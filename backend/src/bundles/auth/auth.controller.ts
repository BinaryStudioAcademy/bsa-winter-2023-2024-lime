import {
    type UserAuthSignInRequestDto,
    type UserAuthSignUpRequestDto,
} from '~/bundles/users/users.js';
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
import { type IdentityAuthTokenDto } from './types/types.js';

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
                        body: UserAuthSignUpRequestDto;
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
                        body: UserAuthSignInRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.IDENTITY,
            method: 'POST',
            handler: (options) =>
                this.signInIdentity(
                    options as ApiHandlerOptions<{
                        body: IdentityAuthTokenDto;
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
            body: UserAuthSignInRequestDto;
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
     *      parameters:
     *        - in: query
     *          name: referralCode
     *          schema:
     *            type: string
     *          required: false
     *          description: Optional referral code to invite other users
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
            body: UserAuthSignUpRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.CREATED,
            payload: await this.authService.signUp(options.body),
        };
    }

    /**
     * @swagger
     * /api/v1/auth/sign-in-identity:
     *    post:
     *      tags:
     *         - Auth
     *      description: Sign in user into the application using token
     *      requestBody:
     *        description: Token data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                token:
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
    private async signInIdentity(
        options: ApiHandlerOptions<{
            body: IdentityAuthTokenDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.authService.signInIdentity(options.body),
        };
    }
}

export { AuthController };
