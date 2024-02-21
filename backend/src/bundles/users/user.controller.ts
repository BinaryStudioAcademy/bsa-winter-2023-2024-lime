import { type UserGetCurrentRequestDto } from 'shared';

import { type UserService } from '~/bundles/users/user.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { UsersApiPath } from './enums/enums.js';

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
 */
class UserController extends BaseController {
    private userService: UserService;

    public constructor(logger: Logger, userService: UserService) {
        super(logger, ApiPath.USERS);

        this.userService = userService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'GET',
            // isProtected: true, we can add it later and it will require token
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: UsersApiPath.CURRENT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getCurrentUser(
                    options as ApiHandlerOptions<{
                        user: UserGetCurrentRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /users:
     *    get:
     *      description: Returns an array of users
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/User'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userService.findAll(),
        };
    }

    /**
     * @swagger
     * /current:
     *    get:
     *      description: Returns the current user
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                   user:
     *                  $ref: '#/components/schemas/User'
     */
    private getCurrentUser(
        options: ApiHandlerOptions<{ user: UserGetCurrentRequestDto }>,
    ): ApiHandlerResponse {
        const { user } = options;

        if (!user) {
            throw new HttpError({
                message: 'User was not found',
                status: HttpCode.NOT_FOUND,
            });
        }

        return {
            status: HttpCode.OK,
            payload: user,
        };
    }
}

export { UserController };
