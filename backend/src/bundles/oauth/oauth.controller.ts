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

import { ConnectionsPath, HttpCode, OAuthActionsPath } from './enums/enums.js';
import {
    type OAuthExchangeAuthCodeDto,
    type OAuthProviderParameterDto,
} from './types/types.js';
import { oAuthProviderValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *           enum:
 *              - COMMON
 *              - VALIDATION
 *         message:
 *           type: string
 *
 */

class OAuthController extends BaseController {
    private oAuthService: OAuthService;

    private config: Config;

    private baseUrl: string;

    public constructor(
        logger: Logger,
        oAuthService: OAuthService,
        config: Config,
    ) {
        super(logger, ApiPath.OAUTH);

        this.oAuthService = oAuthService;
        this.config = config;
        this.baseUrl = `http://${this.config.ENV.APP.HOST}:${this.config.ENV.APP.PORT}/api/v1`;

        this.addRoute({
            path: OAuthActionsPath.$PROVIDER_AUTHORIZE,
            method: 'GET',
            validation: {
                params: oAuthProviderValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.authorize(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
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
     *        302:
     *          description: Found
     *          headers:
     *            Location:
     *              description: The URL to Third-Party authorization prompt
     *              schema:
     *                type: string
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async authorize(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            params: OAuthProviderParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.user;
        const { provider } = options.params;
        const redirectUrl = await this.oAuthService.getAuthorizeRedirectUrl(
            provider,
            id,
        );

        return {
            type: ApiHandlerResponseType.REDIRECT,
            status: HttpCode.FOUND,
            redirectUrl: redirectUrl.href,
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
        const payload = { ...query, userId: data.userId, state: data.uuid };
        await this.oAuthService.exchangeAuthCode(
            provider,
            isStateJSON ? payload : query,
        );

        return {
            type: ApiHandlerResponseType.REDIRECT,
            status: HttpCode.FOUND,
            redirectUrl: `${this.baseUrl}${ApiPath.CONNECTIONS}${ConnectionsPath.ROOT}`,
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
     *        302:
     *          description: Found
     *          headers:
     *            Location:
     *              description: The URL endpoint with user connections
     *              schema:
     *                type: string
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
            type: ApiHandlerResponseType.REDIRECT,
            status: HttpCode.FOUND,
            redirectUrl: `${this.baseUrl}${ApiPath.CONNECTIONS}${ConnectionsPath.ROOT}`,
        };
    }
}

export { OAuthController };
