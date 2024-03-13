import { type Config } from '~/common/config/config.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { AppRoute, HttpCode, IdentityActionsPath } from './enums/enums.js';
import { type IdentityService } from './identity.js';
import {
    type IdentityExchangeAuthCodeDto,
    type IdentityProviderParameterDto,
} from './types/types.js';
import { identityProviderValidationSchema } from './validation-schemas/validation-schemas.js';

class IdentityController extends BaseController {
    private identityService: IdentityService;

    private config: Config;

    public constructor(
        logger: Logger,
        identityService: IdentityService,
        config: Config,
    ) {
        super(logger, ApiPath.IDENTITY);
        this.identityService = identityService;
        this.config = config;

        this.addRoute({
            path: IdentityActionsPath.$PROVIDER_AUTHORIZE,
            method: 'GET',
            validation: {
                params: identityProviderValidationSchema,
            },
            handler: (options) =>
                this.authorize(
                    options as ApiHandlerOptions<{
                        params: IdentityProviderParameterDto;
                    }>,
                ),
        });

        this.addRoute({
            path: IdentityActionsPath.$PROVIDER_EXCHANGE_TOKEN,
            method: 'GET',
            validation: {
                params: identityProviderValidationSchema,
            },
            handler: (options) =>
                this.exchangeToken(
                    options as ApiHandlerOptions<{
                        query: IdentityExchangeAuthCodeDto;
                        params: IdentityProviderParameterDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/identity/:provider/authorize:
     *    get:
     *      tags:
     *       - Identity
     *      description: Authorize user of a specified provider. Authorize with Third-Party Service
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
     *                     description: Identity prompt redirect URL
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
            params: IdentityProviderParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { provider } = options.params;
        const redirectUrl =
            await this.identityService.getAuthorizeRedirectUrl(provider);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: { redirectUrl: redirectUrl.href },
        };
    }

    private async exchangeToken(
        options: ApiHandlerOptions<{
            query: IdentityExchangeAuthCodeDto;
            params: IdentityProviderParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const query = options.query;
        const isStateJSON = /{.*}/.test(query.state);
        const { provider } = options.params;
        const data = isStateJSON ? JSON.parse(query.state) : query;
        const payload = {
            ...query,
            state: data.uuid,
        };

        const { token } = await this.identityService.exchangeAuthCode(
            provider,
            isStateJSON ? payload : query,
        );
        return {
            type: ApiHandlerResponseType.REDIRECT,
            status: HttpCode.FOUND,
            redirectUrl: `${this.config.ENV.APP.CLIENT_BASE_URL}${AppRoute.IDENTITY}/${token}`,
        };
    }
}

export { IdentityController };
