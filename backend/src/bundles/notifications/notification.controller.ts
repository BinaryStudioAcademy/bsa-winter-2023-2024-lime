import { BaseController } from '~/common/controller/base-controller.package.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type UserAuthResponseDto } from '../users/users.js';
import { type NotificationService } from './notification.service.js';
import {
    type NotificationRequestDto,
    type PaginationParameters,
    NotificationsApiPath,
    notificationValidationSchema,
    paginationValidationSchema,
} from './notifications.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      NotificationResponseDto:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          type:
 *            type: string
 *            enum:
 *              - default
 *          isRead:
 *            type: boolean
 *          title:
 *            type: string
 *            nullable: true
 *          message:
 *            type: string
 *      NotificationRequestDto:
 *        type: object
 *        properties:
 *          type:
 *            type: string
 *            nullable: true
 *            enum:
 *              - default
 *          isRead:
 *            type: boolean
 *            nullable: true
 *          title:
 *            type: string
 *            nullable: true
 *          message:
 *            type: string
 */
class NotificationController extends BaseController {
    private notificationService: NotificationService;

    public constructor(
        logger: Logger,
        notificationService: NotificationService,
    ) {
        super(logger, ApiPath.NOTIFICATIONS);

        this.notificationService = notificationService;

        this.addRoute({
            path: NotificationsApiPath.ROOT,
            method: 'GET',
            isProtected: true,
            validation: {
                query: paginationValidationSchema,
            },
            handler: (options) =>
                this.findAllNotifications(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        query: PaginationParameters;
                    }>,
                ),
        });

        this.addRoute({
            path: NotificationsApiPath.ROOT,
            method: 'POST',
            isProtected: true,
            validation: {
                body: notificationValidationSchema,
            },
            handler: (options) =>
                this.createNotification(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        body: NotificationRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: NotificationsApiPath.DISMISS,
            method: 'PATCH',
            isProtected: true,
            handler: (options) =>
                this.dismissNotification(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        params: { notificationId: string };
                    }>,
                ),
        });

        this.addRoute({
            path: NotificationsApiPath.DELETE,
            method: 'DELETE',
            isProtected: true,
            handler: (options) =>
                this.deleteNotification(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                        params: { notificationId: string };
                    }>,
                ),
        });

        this.addRoute({
            path: NotificationsApiPath.UNREAD,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findNumberOfUnreadNotifications(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/notifications/:
     *    get:
     *      tags:
     *       - Notifications
     *      description: Returns an array of notifications with pagination and total amount of notifications
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
     *                       $ref: '#/components/schemas/NotificationResponseDto'
     *                   total:
     *                     type: number
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async findAllNotifications(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            query: PaginationParameters;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, query } = options;
        const { page = 1, limit = 10 } = query;

        return {
            status: HttpCode.OK,
            payload: await this.notificationService.paginatedFind({
                userId: user.id,
                page: +page,
                limit: +limit,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/notifications/unread/:
     *    get:
     *      tags:
     *       - Notifications
     *      description: Returns an amount of unreaded notifications
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
     *                   amount:
     *                     type: number
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async findNumberOfUnreadNotifications(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user } = options;
        const allNotifications = await this.notificationService.findAll(
            user.id,
        );
        const unreadedNotificationsAmount = allNotifications.items.filter(
            (notification) => notification.isRead === false,
        ).length;

        return {
            status: HttpCode.OK,
            payload: {
                amount: unreadedNotificationsAmount,
            },
        };
    }

    /**
     * @swagger
     * /api/v1/notifications/:
     *    post:
     *      tags:
     *        - Notifications
     *      description: Create notification and return it
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Notification data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/NotificationRequestDto'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/NotificationResponseDto'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async createNotification(
        options: ApiHandlerOptions<{
            body: NotificationRequestDto;
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;

        return {
            status: HttpCode.CREATED,
            payload: await this.notificationService.create({
                ...body,
                userId: user.id,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/notifications/{notificationId}/dismiss:
     *    patch:
     *      parameters:
     *      - in: path
     *        name: notificationId
     *        required: true
     *      tags:
     *        - Notifications
     *      description: Update field isRead in a notification and return it
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/NotificationResponseDto'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async dismissNotification(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            params: { notificationId: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, params } = options;

        return {
            status: HttpCode.OK,
            payload: await this.notificationService.dismiss(
                params.notificationId,
                user.id,
            ),
        };
    }

    /**
     * @swagger
     * /api/v1/notifications/{notificationId}:
     *    delete:
     *      parameters:
     *      - in: path
     *        name: notificationId
     *        required: true
     *      tags:
     *        - Notifications
     *      description: Delete notification and return true
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: boolean
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async deleteNotification(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
            params: { notificationId: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, params } = options;

        return {
            status: HttpCode.OK,
            payload: await this.notificationService.delete({
                id: params.notificationId,
                userId: user.id,
            }),
        };
    }
}

export { NotificationController };
