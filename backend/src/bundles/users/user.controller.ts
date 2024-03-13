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
import { type Logger } from '~/common/logger/logger.js';
import { upload } from '~/common/middlewares/file.middleware.js';
import { type File } from '~/common/services/file/types/types.js';

import { UsersApiPath } from './enums/enums.js';
import {
    userUpdateProfileValidationSchema,
    userUploadAvatarValidationSchema,
} from './validation-schemas/validation-schemas.js';

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
            validation: {
                body: userUpdateProfileValidationSchema,
            },
            handler: (options) =>
                this.updateUser(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserUpdateProfileRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.UPLOAD_AVATAR,
            method: 'POST',
            isProtected: true,
            preHandler: upload.single('image'),
            handler: (options) =>
                this.uploadAvatar(options as ApiHandlerOptions<{ file: File }>),
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
     * /api/v1/users/upload:
     *   post:
     *     tags:
     *       - Users
     *     description: This endpoint uploads user avatar and returns a link to it
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *                image:
     *                  type: file
     *                  nullable: false
     *     responses:
     *       201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  avatarUrl:
     *                    type: string
     *                    nullable: false
     *       400:
     *         description: Conflict
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    private async uploadAvatar(
        options: ApiHandlerOptions<{ file: File }>,
    ): Promise<ApiHandlerResponse> {
        const { file } = options;
        const isValid = userUploadAvatarValidationSchema.safeParse({
            image: file,
        });
        if (!isValid.success) {
            throw new HttpError({
                message: isValid.error.issues[0]?.message ?? 'Invalid file',
                status: HttpCode.BAD_REQUEST,
            });
        }
        try {
            const avatarUrl = await this.userService.uploadAvatar(file);
            return {
                type: ApiHandlerResponseType.DATA,
                status: HttpCode.CREATED,
                payload: avatarUrl,
            };
        } catch (error) {
            throw new HttpError({
                message: `Something went wrong ${error}`,
                status: HttpCode.CONFLICT,
            });
        }
    }
}

export { UserController };
