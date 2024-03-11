import { type OAuthService } from '~/bundles/oauth/oauth.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import { type Config } from '~/common/config/config.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import {
    AppRoute,
    HttpCode,
    OAuthActionsPath,
    OAuthType,
} from './enums/enums.js';
import {
    type OAuthExchangeAuthCodeDto,
    type OAuthProviderParameterDto,
} from './types/types.js';
import {
    oAuthConnectionProviderValidationSchema,
    oAuthIdentityProviderValidationSchema,
    oAuthProviderValidationSchema,
} from './validation-schemas/validation-schemas.js';

class OAuthController extends BaseController {
    private oAuthService: OAuthService;

    private config: Config;

    public constructor(
        logger: Logger,
        oAuthService: OAuthService,
        config: Config,
    ) {
        super(logger, ApiPath.OAUTH);

        this.oAuthService = oAuthService;
        this.config = config;

        this.addRoute({
            path: OAuthActionsPath.$PROVIDER_AUTHORIZE_CONNECTION,
            method: 'GET',
            validation: {
                params: oAuthConnectionProviderValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.authorizeConnection(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        params: OAuthProviderParameterDto;
                    }>,
                ),
        });

        this.addRoute({
            path: OAuthActionsPath.$PROVIDER_AUTHORIZE_IDENTITY,
            method: 'GET',
            validation: {
                params: oAuthIdentityProviderValidationSchema,
            },
            handler: (options) =>
                this.authorizeIdentity(
                    options as ApiHandlerOptions<{
                        params: OAuthProviderParameterDto;
                    }>,
                ),
        });

        this.addRoute({
            path: OAuthActionsPath.$PROVIDER_EXCHANGE_TOKEN,
            method: 'GET',
            validation: {
                params: oAuthProviderValidationSchema,
            },
            handler: (options) =>
                this.exchangeToken(
                    options as ApiHandlerOptions<{
                        query: OAuthExchangeAuthCodeDto;
                        params: OAuthProviderParameterDto;
                    }>,
                ),
        });

        this.addRoute({
            path: OAuthActionsPath.$PROVIDER_DEAUTHORIZE,
            method: 'GET',
            validation: {
                params: oAuthProviderValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.deauthorize(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        params: OAuthProviderParameterDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/oauth/:provider/authorize:
     *    get:
     *      tags:
     *       - OAuth
     *      description: Connects user's account of a specified provider. Authorize with Third-Party Service
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 properties:
     *                   redirectUrl:
     *                     type: string
     *                     description: OAuth prompt redirect URL
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async authorizeConnection(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            params: OAuthProviderParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.user;
        const { provider } = options.params;
        const redirectUrl = await this.oAuthService.getAuthorizeRedirectUrl(
            provider,
            OAuthType.CONNECTION,
            id,
        );

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: { redirectUrl: redirectUrl.href },
        };
    }

    private async authorizeIdentity(
        options: ApiHandlerOptions<{
            params: OAuthProviderParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { provider } = options.params;
        const redirectUrl = await this.oAuthService.getAuthorizeRedirectUrl(
            provider,
            OAuthType.IDENTITY,
            null,
        );

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: { redirectUrl: redirectUrl.href },
        };
    }

    private async exchangeToken(
        options: ApiHandlerOptions<{
            query: OAuthExchangeAuthCodeDto;
            params: OAuthProviderParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const query = options.query;
        const isStateJSON = /{.*}/.test(query.state);
        const { provider } = options.params;
        const data = isStateJSON ? JSON.parse(query.state) : query;
        const payload = {
            ...query,
            userId: data.userId,
            state: data.uuid,
            type: data.type,
        };

        if (payload.type === OAuthType.CONNECTION) {
            await this.oAuthService.exchangeAuthCodeForConnection(
                provider,
                isStateJSON ? payload : query,
            );
            return {
                type: ApiHandlerResponseType.REDIRECT,
                status: HttpCode.FOUND,
                redirectUrl: `${this.config.ENV.APP.CLIENT_BASE_URL}${AppRoute.PROFILE_CONNECTIONS}`,
            };
        }

        if (payload.type === OAuthType.IDENTITY) {
            const token = await this.oAuthService.exchangeAuthCodeForIdentity(
                provider,
                isStateJSON ? payload : query,
            );
            return {
                type: ApiHandlerResponseType.REDIRECT,
                status: HttpCode.FOUND,
                redirectUrl: `${this.config.ENV.APP.CLIENT_BASE_URL}${AppRoute.OAUTH}/${token}`,
            };
        }

        return {
            type: ApiHandlerResponseType.REDIRECT,
            status: HttpCode.BAD_REQUEST,
            redirectUrl: `${this.config.ENV.APP.CLIENT_BASE_URL}${AppRoute.NOT_FOUND}`,
        };
    }

    /**
     * @swagger
     * /api/v1/oauth/:provider/deauthorize:
     *    get:
     *      tags:
     *       - OAuth
     *      description: Disconnects user's account of a specified provider
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 properties:
     *                   provider:
     *                     type: string
     *                     enum:
     *                       - strava
     *                       - google-fit
     *                     description: Disconnected provider
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async deauthorize(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            params: OAuthProviderParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.user;
        const { provider } = options.params;

        await this.oAuthService.deauthorize(provider, id);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: { provider },
        };
    }
}

export { OAuthController };
