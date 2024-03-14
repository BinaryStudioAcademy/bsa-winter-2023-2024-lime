import { MAX_NUMBER_OF_USERS } from '~/bundles/users/constants/constants.js';
import { type PaginationParameters } from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import {
    type UserAuthResponseDto,
    type UserFollowingsRequestDto,
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
            path: UsersApiPath.FOLLOWINGS,
            method: 'POST',
            isProtected: true,
            handler: (options) =>
                this.addFollowing(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserFollowingsRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.FOLLOWINGS,
            method: 'DELETE',
            isProtected: true,
            handler: (options) =>
                this.removeFollowing(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserFollowingsRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.FOLLOWINGS,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getFollowings(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        query: PaginationParameters;
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.NOT_FOLLOWED,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getNotFollowed(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        query: PaginationParameters;
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
     * /api/v1/users/followings:
     *    post:
     *      tags:
     *       - Friends
     *      description: Add following
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

    private async addFollowing(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: UserFollowingsRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const { followingId } = body;
        const { id } = user;
        try {
            const addedFriend = await this.userService.addFollowing(
                id,
                followingId,
            );
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
     * /api/v1/users/followings:
     *    delete:
     *      tags:
     *       - Friends
     *      description: Remove following
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

    private async removeFollowing(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: UserFollowingsRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const { followingId } = body;
        const { id } = user;
        try {
            const removedFollowing = await this.userService.removeFollowing(
                id,
                followingId,
            );
            if (!removedFollowing) {
                throw new HttpError({
                    message: UserValidationMessage.FOLLOWING_NOT_FOUND,
                    status: HttpCode.NOT_FOUND,
                });
            }
            return {
                type: ApiHandlerResponseType.DATA,
                status: HttpCode.OK,
                payload: followingId,
            };
        } catch (error) {
            throw new Error(`Error occurred while removing friend: ${error}`);
        }
    }

    /**
     * @swagger
     * /api/v1/users/followings:
     *    get:
     *      tags:
     *       - Friends
     *      description: Get all user followings
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

    private async getFollowings(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            query: PaginationParameters;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, query } = options;
        const { page = '1', limit = '10' } = query;

        try {
            const offset = ((+page - 1) * +limit).toString();
            const totalCount = await this.userService.getFollowings(
                user.id,
                '0',
                MAX_NUMBER_OF_USERS,
            );
            const friends = await this.userService.getFollowings(
                user.id,
                offset,
                limit,
            );

            return {
                type: ApiHandlerResponseType.DATA,
                status: HttpCode.OK,
                payload: {
                    users: friends,
                    query: {
                        page: +page,
                        limit: +limit,
                        totalCount: totalCount?.length,
                    },
                },
            };
        } catch (error) {
            throw new HttpError({
                message: `Error fetching user's friends: ${error}`,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }

    /**
     * @swagger
     * /api/v1/users/not-followed:
     *    get:
     *      tags:
     *       - Friends
     *      description: Get all followers that the user is not yet following
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

    private async getNotFollowed(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            query: PaginationParameters;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, query } = options;
        const { page = '1', limit = '10' } = query;

        try {
            const offset = ((+page - 1) * +limit).toString();
            const totalCount = await this.userService.getNotFollowed(
                user.id,
                '0',
                MAX_NUMBER_OF_USERS,
            );
            const notFriends = await this.userService.getNotFollowed(
                user.id,
                offset,
                limit,
            );
            return {
                type: ApiHandlerResponseType.DATA,
                status: HttpCode.OK,
                payload: {
                    users: notFriends,
                    query: {
                        page: +page,
                        limit: +limit,
                        totalCount: totalCount?.length,
                    },
                },
            };
        } catch (error) {
            throw new HttpError({
                message: `Error fetching user's not followed: ${error}`,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

export { UserController };
