import { type UserService } from '~/bundles/users/user.service.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { UsersApiPath } from './enums/enums.js';

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
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 *          fullName:
 *            type: string
 *            nullable: true
 *          avatarUrl:
 *            type: string
 *            nullable: true
 *            format: uri
 *          username:
 *            type: string
 *            nullable: true
 *          dateOfBirth:
 *            type: date
 *            format: DD/MM/YYYY
 *            nullable: true
 *          weight:
 *            type: string
 *            nullable: true
 *          height:
 *            type: string
 *            nullable: true
 *          gender:
 *            type: string
 *            nullable: true
 *            enum:
 *              - male
 *              - female
 */
class UserController extends BaseController {
    private userService: UserService;

    public constructor(logger: Logger, userService: UserService) {
        super(logger, ApiPath.USERS);

        this.userService = userService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: UsersApiPath.CURRENT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getCurrentUser(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/users/:
     *    get:
     *      tags:
     *       - Users
     *      description: Returns an array of users
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
     *                       $ref: '#/components/schemas/User/'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.userService.findAll(),
        };
    }

    /**
     * @swagger
     * /api/v1/users/current:
     *    get:
     *      tags:
     *       - Current user
     *      description: Returns current user
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/User'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private getCurrentUser(
        options: ApiHandlerOptions<{ user: UserAuthResponseDto }>,
    ): ApiHandlerResponse {
        const { user } = options;

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: user,
        };
    }
}

export { UserController };
