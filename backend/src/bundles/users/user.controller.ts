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
            path: `${UsersApiPath.UPDATE_USER}/:userId`,
            method: 'PATCH',
            isProtected: true,
            handler: (options) =>
                this.updateUser(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: UserUpdateProfileRequestDto;
                        params: { userId: string };
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

    private async updateUser(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: UserUpdateProfileRequestDto;
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
            return error instanceof Error
                ? {
                      status: HttpCode.NOT_FOUND,
                      payload: { error: error.message },
                  }
                : {
                      status: HttpCode.INTERNAL_SERVER_ERROR,
                      payload: { error: 'An unexpected error occurred.' },
                  };
        }
    }
}

export { UserController };
