import { UserValidationMessage } from 'shared';

import { type UserService } from '~/bundles/users/user.service.js';
import {
    type UserAuthResponseDto,
    type UserUpdateProfileRequestDto,
} from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';
import { upload } from '~/common/middlewares/file.middleware.js';

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
 *            type: string
 *            nullable: true
 *            format: date
 *          weight:
 *            type: number
 *            nullable: true
 *          height:
 *            type: number
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

        this.addRoute({
            path: `${UsersApiPath.UPDATE_USER}/:userId`,
            method: 'PATCH',
            isProtected: true,
            preHandler: upload.single('image'),
            handler: (options) =>
                this.updateUser(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserUpdateProfileRequestDto;
                        file: File;
                        params: { userId: string };
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
            status: HttpCode.OK,
            payload: user,
        };
    }

    private async updateUser(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: UserUpdateProfileRequestDto;
            file: File;
            params: { userId: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body, params } = options;
        const userId = params.userId;

        try {
            if (Number(userId) !== Number(user.id)) {
                throw new Error('Token mismatch');
            }
            const updatedUser = await this.userService.update(
                Number(userId),
                body,
            );
            if (updatedUser && body.dateOfBirth) {
                const [day, month, year] = body.dateOfBirth.split('/');
                const parsedDate = new Date(`${year}-${month}-${day}`);

                if (Number.isNaN(parsedDate.getTime())) {
                    throw new HttpError({
                        message: UserValidationMessage.BIRTHDATE_FORMAT,
                        status: HttpCode.BAD_REQUEST,
                    });
                } else {
                    const formattedDate =
                        parsedDate.toLocaleDateString('en-GB');

                    updatedUser.dateOfBirth = formattedDate;
                }
            }

            return {
                status: HttpCode.OK,
                payload: updatedUser,
            };
        } catch (error) {
            throw new HttpError({
                message: `Something went wrong ${error}`,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }
}

export { UserController };
