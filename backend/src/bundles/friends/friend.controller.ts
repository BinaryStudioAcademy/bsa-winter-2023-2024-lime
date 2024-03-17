import { MAX_NUMBER_OF_USERS } from '~/bundles/friends/constants/constants.js';
import { type FriendService } from '~/bundles/friends/friend.service.js';
import {
    type FriendRequestDto,
    type PaginationParameters,
} from '~/bundles/friends/types/types.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type UserAuthResponseDto } from './enums/enums.js';
import { FriendsApiPath } from './enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Friend:
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
 *          email:
 *            type: string
 *            nullable: true
 *          avatarUrl:
 *            type: string
 *            nullable: true
 *          username:
 *            type: string
 *            nullable: true
 *          fullName:
 *            type: string
 *            nullable: true
 *          dateOfBirth:
 *            type: string
 *            format: date
 *            nullable: true
 *          weight:
 *            type: number
 *            nullable: true
 *          height:
 *            type: number
 *            nullable: true
 *          location:
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

/**
 * @swagger
 * components:
 *   schemas:
 *     FriendRequestDto:
 *       type: object
 *       properties:
 *         followingId:
 *           type: number
 *           format: integer
 *           description: The ID of the user being followed.
 *         offset:
 *           type: string
 *           description: The offset for pagination.
 *       required:
 *         - followingId
 *         - offset
 */

class FriendController extends BaseController {
    private friendService: FriendService;

    public constructor(logger: Logger, friendService: FriendService) {
        super(logger, ApiPath.FRIENDS);

        this.friendService = friendService;

        this.addRoute({
            path: FriendsApiPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findAllPotentialFollowings(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        query: PaginationParameters;
                    }>,
                ),
        });

        this.addRoute({
            path: FriendsApiPath.FOLLOWINGS,
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
            path: FriendsApiPath.FOLLOWINGS,
            method: 'POST',
            isProtected: true,
            handler: (options) =>
                this.addFollowing(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: FriendRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: FriendsApiPath.FOLLOWINGS,
            method: 'DELETE',
            isProtected: true,
            handler: (options) =>
                this.removeFollowing(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: FriendRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/friends:
     *   get:
     *     tags:
     *       - Friends
     *     summary: Retrieve potential friends
     *     description: Returns an array of all potential friends.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: The page number for pagination.
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: The maximum number of users per page.
     *     responses:
     *       '200':
     *         description: Successful operation. Returns a list of potential friends.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 users:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Friend'
     *                 query:
     *                   type: object
     *                   properties:
     *                     page:
     *                       type: integer
     *                       minimum: 1
     *                     limit:
     *                       type: integer
     *                       minimum: 1
     *                     totalCount:
     *                       type: integer
     *       '401':
     *         description: Unauthorized. Authentication failure.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */

    private async findAllPotentialFollowings(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            query: PaginationParameters;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, query } = options;
        const { page = '1', limit = '10' } = query;
        const offset = ((+page - 1) * +limit).toString();

        const totalCount = await this.friendService.findAllPotentialFollowings(
            user.id,
            '0',
            MAX_NUMBER_OF_USERS,
        );
        const notFollowings =
            await this.friendService.findAllPotentialFollowings(
                user.id,
                offset,
                limit,
            );
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: {
                users: notFollowings,
                query: {
                    page: +page,
                    limit: +limit,
                    totalCount: totalCount?.length,
                },
            },
        };
    }

    /**
     * @swagger
     * /api/v1/friends/followings:
     *    get:
     *      tags:
     *       - Friends
     *      summary: Get all user followings
     *      description: Retrieves a list of users that the specified user is following.
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: query
     *          name: page
     *          schema:
     *            type: integer
     *            minimum: 1
     *          description: The page number for pagination.
     *        - in: query
     *          name: limit
     *          schema:
     *            type: integer
     *            minimum: 1
     *          description: The maximum number of users per page.
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  users:
     *                    type: array
     *                    items:
     *                      $ref: '#/components/schemas/Friend'
     *                  query:
     *                    type: object
     *                    properties:
     *                      page:
     *                        type: integer
     *                        minimum: 1
     *                      limit:
     *                        type: integer
     *                        minimum: 1
     *                      totalCount:
     *                        type: integer
     *        401:
     *          description: Failed operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error'
     */

    private async getFollowings(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            query: PaginationParameters;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, query } = options;
        const { page = '1', limit = '10' } = query;
        const offset = ((+page - 1) * +limit).toString();

        const totalCount = await this.friendService.getFollowings(
            user.id,
            '0',
            MAX_NUMBER_OF_USERS,
        );
        const friends = await this.friendService.getFollowings(
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
    }

    /**
     * @swagger
     * /api/v1/friends/followings:
     *   post:
     *     tags:
     *       - Friends
     *     summary: Add a user as following
     *     description: Adds a user to the list of followings for the authenticated user.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FriendRequestDto'
     *     responses:
     *       '200':
     *         description: Successful operation. Returns the next user for following.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Friend'
     *       '401':
     *         description: Unauthorized. Authentication failure.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */

    private async addFollowing(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: FriendRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const { followingId, offset } = body;
        const { id } = user;

        const addedFollowing = await this.friendService.addFollowing(
            id,
            followingId,
            offset,
        );

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: addedFollowing,
        };
    }

    /**
     * @swagger
     * /api/v1/friends/followings:
     *   delete:
     *     tags:
     *       - Friends
     *     summary: Remove following
     *     description: Removes a user from the list of followings for the specified user.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FriendRequestDto'
     *     responses:
     *       '200':
     *         description: Successful operation. Returns the details of the next followed user.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Friend'
     *       '401':
     *         description: Unauthorized. Authentication failure.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */

    private async removeFollowing(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: FriendRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const { followingId, offset } = body;
        const { id } = user;
        const data = await this.friendService.removeFollowing(
            id,
            followingId,
            offset,
        );

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: data,
        };
    }
}

export { FriendController };
