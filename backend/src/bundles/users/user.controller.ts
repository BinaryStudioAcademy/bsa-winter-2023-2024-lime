import { googleFitService } from '~/bundles/google-fit/google-fit.js';
import { type OAuthRepository, OAuthProvider } from '~/bundles/oauth/oauth.js';
import { type UserService } from '~/bundles/users/user.service.js';
import {
    type UserAuthResponseDto,
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

import { type UserBonusService } from '../user-bonuses/user-bonuses.js';
import { UsersApiPath } from './enums/enums.js';
import { type UserControllerProperties } from './types/types.js';

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
class UserController extends BaseController {
    private userService: UserService;
    private oAuthRepository: OAuthRepository;
    private userBonusService: UserBonusService;

    public constructor({
        logger,
        userService,
        oAuthRepository,
        userBonusService,
    }: UserControllerProperties) {
        super(logger, ApiPath.USERS);

        this.userService = userService;
        this.oAuthRepository = oAuthRepository;
        this.userBonusService = userBonusService;

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
            path: UsersApiPath.GET_BY_ID,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getUserById(
                    options as ApiHandlerOptions<{
                        params: { id: number };
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
            path: UsersApiPath.CURRENT_BONUSES,
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
    private async getCurrentUser(
        options: ApiHandlerOptions<{ user: UserAuthResponseDto }>,
    ): Promise<ApiHandlerResponse> {
        const { user } = options;
        const { id } = user;
        const oAuthEntity = await this.oAuthRepository.find({
            userId: id,
            provider: OAuthProvider.GOOGLE_FIT,
        });
        if (oAuthEntity) {
            void googleFitService.handleData(oAuthEntity);
        }
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: user,
        };
    }
    /**
     * @swagger
     * /api/v1/users/{id}:
     *    get:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        description: The ID of the user to retrieve
     *        schema:
     *          type: integer
     *      tags:
     *       - Users
     *      description: Returns user by ID
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
    private async getUserById(
        options: ApiHandlerOptions<{
            params: { id: number };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { params } = options;
        const achievement = await this.userService.find({ id: params.id });

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: achievement,
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

export { UserController };
