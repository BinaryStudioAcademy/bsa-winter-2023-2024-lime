import { type OAuthService, HttpCode } from '~/bundles/oauth/oauth.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { ConnectionsPath } from './enums/enums.js';

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

/**
 * @swagger
 * components:
 *    schemas:
 *      OAuth:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          tokenType:
 *            type: string
 *          expiresAt:
 *            type: number
 *            format: number
 *            minimum: 0
 *          accessToken:
 *            type: string
 *          refreshToken:
 *            type: string
 *          scope:
 *            type: string
 *            nullable: true
 *          provider:
 *            type: string
 *            enum:
 *              - strava
 *              - google-fit
 */

class ConnectionController extends BaseController {
    private oAuthService: OAuthService;

    public constructor(logger: Logger, oAuthService: OAuthService) {
        super(logger, ApiPath.CONNECTIONS);

        this.oAuthService = oAuthService;

        this.addRoute({
            path: ConnectionsPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getUserConnections(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/connections/:
     *    get:
     *      tags:
     *       - Connections
     *      description: Returns an array of current user connections
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
     *                   items:
     *                     type: array
     *                     items:
     *                       $ref: '#/components/schemas/OAuth/'
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async getUserConnections(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.oAuthService.findMany({
                userId: options.user.id,
            }),
        };
    }
}

export { ConnectionController };
