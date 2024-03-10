import { HttpCode } from 'shared';

import { type UserAuthResponseDto } from '~/bundles/users/types/types.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { GoalsApiPath } from './enums/enums.js';
import { type GoalService } from './goal.service.js';
import { type GoalRequestDto } from './types/types.js';
import { goalValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      GoalResponseDto:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          activityType:
 *            type: string
 *            enum:
 *              - cycling
 *              - running
 *              - walking
 *          frequency:
 *            type: number
 *            minimum: 1
 *          frequencyType:
 *            type: string
 *            enum:
 *              - day
 *              - week
 *              - month
 *          distance:
 *            type: number
 *            minimum: 1
 *            nullable: true
 *          duration:
 *            type: number
 *            minimum: 1
 *            nullable: true
 *          progress:
 *            type: number
 *          completedAt:
 *            type: string
 *            nullable: true
 *            format: date
 *      GoalRequestDto:
 *        type: object
 *        properties:
 *          activityType:
 *            type: string
 *            enum:
 *              - cycling
 *              - running
 *              - walking
 *          frequency:
 *            type: number
 *            minimum: 1
 *          frequencyType:
 *            type: string
 *            enum:
 *              - day
 *              - week
 *              - month
 *          distance:
 *            type: number
 *            minimum: 1
 *            nullable: true
 *          duration:
 *            type: number
 *            minimum: 1
 *            nullable: true
 */
class GoalController extends BaseController {
    private goalService: GoalService;

    public constructor(logger: Logger, goalService: GoalService) {
        super(logger, ApiPath.GOALS);
        this.goalService = goalService;

        this.addRoute({
            path: GoalsApiPath.ID,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        params: { id: string };
                        user: UserAuthResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: GoalsApiPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findAll(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: GoalsApiPath.USER_ID,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findByUserId(
                    options as ApiHandlerOptions<{
                        params: { userId: number };
                    }>,
                ),
        });

        this.addRoute({
            path: GoalsApiPath.ROOT,
            method: 'POST',
            validation: {
                body: goalValidationSchema,
            },
            isProtected: true,
            handler: (options) => {
                return this.create(
                    options as ApiHandlerOptions<{
                        body: GoalRequestDto;
                        user: UserAuthResponseDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: GoalsApiPath.ID,
            method: 'PUT',
            validation: {
                body: goalValidationSchema,
            },
            isProtected: true,
            handler: (options) => {
                return this.update(
                    options as ApiHandlerOptions<{
                        body: GoalRequestDto;
                        params: { id: string };
                        user: UserAuthResponseDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: GoalsApiPath.ID,
            method: 'DELETE',
            isProtected: true,
            handler: (options) => {
                return this.delete(
                    options as ApiHandlerOptions<{
                        params: { id: string };
                        user: UserAuthResponseDto;
                    }>,
                );
            },
        });
    }

    /**
     * @swagger
     * /api/v1/goals/:
     *    get:
     *      tags:
     *       - Goals
     *      description: Returns an array of goals
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
     *                       $ref: '#/components/schemas/GoalResponseDto'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async find(
        options: ApiHandlerOptions<{
            params: { id: string };
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.params;
        const { id: userId } = options.user;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.goalService.find({ id, userId }),
        };
    }

    /**
     * @swagger
     * /api/v1/goals/{id}:
     *    get:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *       - Goals
     *      description: Returns goal by id
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/GoalResponseDto'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async findAll(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id: userId } = options.user;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.goalService.findAll({
                userId,
            }),
        };
    }

    private async findByUserId(
        options: ApiHandlerOptions<{ params: { userId: number } }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;

        const result = await this.goalService.findAll({ userId });

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: result,
        };
    }
    /**
     * @swagger
     * /api/v1/goals/:
     *    post:
     *      tags:
     *        - Goals
     *      description: Create goal and return it
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Goal data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/GoalRequestDto'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/GoalResponseDto'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async create(
        options: ApiHandlerOptions<{
            body: GoalRequestDto;
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id: userId } = options.user;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.CREATED,
            payload: await this.goalService.create({
                ...options.body,
                userId,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/goals/{id}:
     *    put:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *        - Goals
     *      description: Update goal and return it
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Goal data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/GoalRequestDto'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/GoalResponseDto'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */
    private async update(
        options: ApiHandlerOptions<{
            body: GoalRequestDto;
            params: { id: string };
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.params;
        const { id: userId } = options.user;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.goalService.update(
                { id, userId },
                {
                    ...options.body,
                    userId,
                },
            ),
        };
    }

    /**
     * @swagger
     * /api/v1/goals/{id}:
     *    delete:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *        - Goals
     *      description: Delete goal and return true
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
    private async delete(
        options: ApiHandlerOptions<{
            params: { id: string };
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.params;
        const { id: userId } = options.user;
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.goalService.delete({ id, userId }),
        };
    }
}

export { GoalController };
