import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { ScheduleApiPath } from './enums/enums.js';
import { type ScheduleService } from './schedule.service.js';
import {
    type EntityIdParameterDto,
    type ScheduleRequestDto,
    type UserAuthResponseDto,
} from './types/types.js';
import {
    idParameterValidationSchema,
    scheduleValidationSchema,
} from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: integer
 *           minimum: 1
 *         activityType:
 *           type: string
 *           enum:
 *             - cycling
 *             - running
 *             - walking
 *         goalId:
 *           type: number
 *           format: integer
 *           description: optional
 *           nullable: true
 *         startAt:
 *           type: string
 *           format: date-time
 *           description: The start time of the schedule
 *       required:
 *         - id
 *         - activityType
 *         - startAt
 */

class ScheduleController extends BaseController {
    private scheduleService: ScheduleService;
    public constructor(logger: Logger, scheduleService: ScheduleService) {
        super(logger, ApiPath.SCHEDULES);
        this.scheduleService = scheduleService;
        this.addRoute({
            path: ScheduleApiPath.ID,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        params: EntityIdParameterDto;
                    }>,
                ),
        });
        this.addRoute({
            path: ScheduleApiPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) => this.findAll(options),
        });
        this.addRoute({
            path: ScheduleApiPath.ROOT,
            method: 'POST',
            validation: {
                body: scheduleValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: ScheduleRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: ScheduleApiPath.ID,
            method: 'PUT',
            validation: {
                body: scheduleValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: ScheduleRequestDto;
                        params: EntityIdParameterDto;
                    }>,
                ),
        });
        this.addRoute({
            path: ScheduleApiPath.ID,
            method: 'DELETE',
            isProtected: true,
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{
                        params: EntityIdParameterDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/schedules/{id}:
     *    get:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *       - Schedules
     *      description: Returns schedule
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Schedule'
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async find(
        options: ApiHandlerOptions<{
            params: EntityIdParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = idParameterValidationSchema.parse(options.params);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.scheduleService.find({ id }),
        };
    }

    /**
     * @swagger
     * /api/v1/schedules/:
     *    get:
     *      tags:
     *       - Schedules
     *      description: Returns an array of schedules
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
     *                       $ref: '#/components/schemas/Schedule'
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async findAll(
        options: ApiHandlerOptions,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.scheduleService.findAll({
                userId: (options.user as UserAuthResponseDto).id,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/schedules/:
     *    post:
     *      tags:
     *       - Schedules
     *      description: Creates schedule
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Data for schedule
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  activityType:
     *                      type: string
     *                      enum:
     *                          - cycling
     *                          - running
     *                          - walking
     *                      example: walking
     *                  goalId:
     *                      type: number
     *                      format: integer
     *                      description: optional
     *                      minimum: 0
     *                      nullable: true
     *                  startAt:
     *                      type: string
     *                      format: date-time
     *                      description: The start time of the schedule
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Schedule'
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async create(
        options: ApiHandlerOptions<{
            body: ScheduleRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.scheduleService.create({
                ...options.body,
                userId: (options.user as UserAuthResponseDto).id,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/schedules/{id}:
     *    put:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *       - Schedules
     *      description: Updates schedule
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Data for schedule
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  activityType:
     *                       type: string
     *                       enum:
     *                          - cycling
     *                          - running
     *                          - walking
     *                       example: walking
     *                  goalId:
     *                      type: number
     *                      format: integer
     *                      description: optional
     *                      minimum: 0
     *                      nullable: true
     *                  startAt:
     *                      type: string
     *                      format: date-time
     *                      description: The start time of the schedule
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Schedule'
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async update(
        options: ApiHandlerOptions<{
            body: ScheduleRequestDto;
            params: EntityIdParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = idParameterValidationSchema.parse(options.params);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.scheduleService.update(
                { id },
                {
                    ...options.body,
                    userId: (options.user as UserAuthResponseDto).id,
                },
            ),
        };
    }

    /**
     * @swagger
     * /api/v1/schedules/{id}:
     *    delete:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *       - Schedules
     *      description: Deletes schedule
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: number
     *        400:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async delete(
        options: ApiHandlerOptions<{
            params: EntityIdParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = idParameterValidationSchema.parse(options.params);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.scheduleService.delete({ id }),
        };
    }
}

export { ScheduleController };
