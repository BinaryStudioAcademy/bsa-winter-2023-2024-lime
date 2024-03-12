import { type UserService } from '~/bundles/users/user.service.js';
import {
    type UserAuthResponseDto,
    type UserFriendsRequestDto,
    type UserUpdateProfileRequestDto,
} from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { UsersApiPath, UserValidationMessage } from './enums/enums.js';

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
 *              - prefer not to say
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
            path: UsersApiPath.UPDATE_USER,
            method: 'PATCH',
            isProtected: true,
            handler: (options) =>
                this.updateUser(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserUpdateProfileRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.FRIENDS,
            method: 'POST',
            isProtected: true,
            handler: (options) =>
                this.addFriend(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserFriendsRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.FRIENDS,
            method: 'DELETE',
            isProtected: true,
            handler: (options) =>
                this.removeFriend(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserFriendsRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.FRIENDS,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getAllFriends(
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
     *                       $ref: '#/components/schemas/User'
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
     *       - Users
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

    /**
     * @swagger
     * /api/v1/users/update:
     *   patch:
     *     tags:
     *       - Users
     *     description: This endpoint updates a user
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *                fullName:
     *                  type: string
     *                  nullable: true
     *                username:
     *                  type: string
     *                  nullable: true
     *                dateOfBirth:
     *                  type: string
     *                  format: DD/MM/YYYY
     *                  nullable: true
     *                weight:
     *                  type: number
     *                  nullable: true
     *                height:
     *                  type: number
     *                  nullable: true
     *                gender:
     *                  type: string
     *                  nullable: true
     *                  enum:
     *                    - male
     *                    - female
     *                    - prefer not to say
     *     responses:
     *       200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: Not found a user
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    private async updateUser(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: UserUpdateProfileRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const { id } = user;
        try {
            const updatedUser = await this.userService.updateUserProfile(
                id,
                body,
            );
            return {
                type: ApiHandlerResponseType.DATA,
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

    /**
     * @swagger
     * /api/v1/users/friends:
     *    post:
     *      tags:
     *       - Friends
     *      description: Add friend
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

    private async addFriend(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: UserFriendsRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const { friendId } = body;
        const { id } = user;
        try {
            const addedFriend = await this.userService.addFriend(id, friendId);
            if (!addedFriend) {
                throw new HttpError({
                    message: UserValidationMessage.USER_NOT_FOUND,
                    status: HttpCode.NOT_FOUND,
                });
            }
            return {
                type: ApiHandlerResponseType.DATA,
                status: HttpCode.OK,
                payload: addedFriend,
            };
        } catch (error) {
            throw new Error(`Error occurred ${error}`);
        }
    }

    /**
     * @swagger
     * /api/v1/users/friends:
     *    delete:
     *      tags:
     *       - Friends
     *      description: Remove friend
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

    private async removeFriend(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: UserFriendsRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const { friendId } = body;
        const { id } = user;
        try {
            const friendRemoved = await this.userService.removeFriend(
                id,
                friendId,
            );
            if (!friendRemoved) {
                throw new HttpError({
                    message: UserValidationMessage.FRIEND_NOT_FOUND,
                    status: HttpCode.NOT_FOUND,
                });
            }
            return {
                type: ApiHandlerResponseType.DATA,
                status: HttpCode.OK,
                payload: { message: 'Friend removed successfully' },
            };
        } catch (error) {
            throw new Error(`Error occurred while removing friend: ${error}`);
        }
    }

    /**
     * @swagger
     * /api/v1/users/friends:
     *    get:
     *      tags:
     *       - Friends
     *      description: Get all friends
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

    private async getAllFriends(
        options: ApiHandlerOptions<{ user: UserAuthResponseDto }>,
    ): Promise<ApiHandlerResponse> {
        const { user } = options;
        try {
            const friends = await this.userService.getAllFriends(user.id);
            return {
                type: ApiHandlerResponseType.DATA,
                status: HttpCode.OK,
                payload: friends,
            };
        } catch (error) {
            throw new HttpError({
                message: `Error fetching user's friends: ${error}`,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

export { UserController };
