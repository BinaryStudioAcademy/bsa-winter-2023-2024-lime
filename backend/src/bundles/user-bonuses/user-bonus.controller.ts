import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import {
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/types/types.js';

import { type UserAuthResponseDto } from '../users/users.js';
import { UserBonusesApiPath } from './enums/enums.js';
import { type UserBonusService } from './user-bonuses.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      UserBonus:
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
 *          amount:
 *            type: number
 *          actionType:
 *            type: string
 *            enum:
 *              - registered
 *              - invited
 *          createdAt:
 *            type: string
 *            nullable: true
 *
 */
class UserBonusController extends BaseController {
    private userBonusService: UserBonusService;

    public constructor(logger: Logger, userBonusService: UserBonusService) {
        super(logger, ApiPath.USER_BONUSES);

        this.userBonusService = userBonusService;

        this.addRoute({
            path: UserBonusesApiPath.CURRENT_BONUSES,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findBonusesByUserId(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/users/current-bonuses:
     *    get:
     *      tags:
     *       - Users
     *      description: Returns an array of users bonuses transactions
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
     *                       $ref: '#/components/schemas/UserBonus'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async findBonusesByUserId(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = options.user.id;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.userBonusService.findMany({ userId }),
        };
    }
}

export { UserBonusController };
