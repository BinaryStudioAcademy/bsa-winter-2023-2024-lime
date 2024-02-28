import { WorkoutsApiPath } from 'shared';

import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import {
    type CreateWorkoutRequestDto,
    type EntityIdParameterDto,
    type UpdateWorkoutRequestDto,
} from './types/types.js';
import {
    idParameterValidationSchema,
    workoutValidationSchema,
} from './validation-schemas/validation-schemas.js';
import { type WorkoutService } from './workout.service.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: integer
 *           minimum: 1
 *         activity:
 *           type: string
 *           enum:
 *             - cycling
 *             - running
 *             - walking
 *         steps:
 *           type: number
 *           format: integer
 *           description: Returns only for walking activity, optional
 *           minimum: 0
 *           nullable: true
 *         duration:
 *           type: number
 *           format: integer
 *           description: Returns duration of activity
 *           minimum: 0
 *         heartRate:
 *           type: number
 *           format: integer
 *           description: Average heart rate during the workout
 *           minimum: 0
 *         workoutStartedAt:
 *           type: string
 *           format: date-time
 *           description: The start time of the workout
 *         workoutEndedAt:
 *           type: string
 *           format: date-time
 *           description: The end time of the workout, optional
 *           nullable: true
 *         distance:
 *           type: number
 *           format: float
 *           description: Distance covered during the workout
 *           minimum: 0
 *         speed:
 *           type: number
 *           format: float
 *           description: Average speed during the workout
 *           minimum: 0
 *         kilocalories:
 *           type: number
 *           format: integer
 *           description: Calories burned during the workout
 *           minimum: 0
 *       required:
 *         - id
 *         - activity
 *         - heartRate
 *         - duration
 *         - workoutStartedAt
 *         - workoutEndedAt
 *         - distance
 *         - speed
 *         - kilocalories
 */

class WorkoutController extends BaseController {
    private workoutService: WorkoutService;

    public constructor(logger: Logger, workoutService: WorkoutService) {
        super(logger, ApiPath.WORKOUTS);
        this.workoutService = workoutService;
        this.addRoute({
            path: WorkoutsApiPath.ID,
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
            path: WorkoutsApiPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) => this.findAll(options),
        });
        this.addRoute({
            path: WorkoutsApiPath.ROOT,
            method: 'POST',
            validation: {
                body: workoutValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: CreateWorkoutRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: WorkoutsApiPath.ID,
            method: 'PUT',
            validation: {
                body: workoutValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: UpdateWorkoutRequestDto;
                        params: EntityIdParameterDto;
                    }>,
                ),
        });
        this.addRoute({
            path: WorkoutsApiPath.ID,
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
     * /api/v1/workouts/:
     *    get:
     *      tags:
     *       - Workouts
     *      description: Returns an array of workouts
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
     *                       $ref: '#/components/schemas/Workout'
     *              examples:
     *                  walkingResponse:
     *                    value:
     *                      id: 1
     *                      activity: walking
     *                      steps: 3000
     *                      duration: 0
     *                      heartRate: 120
     *                      workoutStartedAt: '2021-01-01T12:00:00Z'
     *                      workoutEndedAt: '2021-01-01T12:30:00Z'
     *                      distance: 5000
     *                      speed: 2.7
     *                      kilocalories: 250
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
            payload: await this.workoutService.findAll({
                userId: (options.user as UserAuthResponseDto).id,
            }),
        };
    }

    /**
     * @swagger
     * /api/v1/workouts/{id}:
     *    get:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *       - Workouts
     *      description: Returns workout
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Workout'
     *              examples:
     *                  walkingResponse:
     *                    value:
     *                      id: 1
     *                      activity: walking
     *                      steps: 3000
     *                      heartRate: 120
     *                      duration: 0
     *                      workoutStartedAt: '2021-01-01T12:00:00Z'
     *                      workoutEndedAt: '2021-01-01T12:30:00Z'
     *                      distance: 5000
     *                      speed: 2.7
     *                      kilocalories: 250
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
            payload: await this.workoutService.find({ id }),
        };
    }

    /**
     * @swagger
     * /api/v1/workouts/:
     *    post:
     *      tags:
     *       - Workouts
     *      description: Creates workout
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Data for workout
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  activity:
     *                      type: string
     *                      enum:
     *                          - cycling
     *                          - running
     *                          - walking
     *                      example: walking
     *                  steps:
     *                      type: number
     *                      format: integer
     *                      description: Returns only for walking activity, optional
     *                      minimum: 0
     *                      nullable: true
     *                  heartRate:
     *                      type: number
     *                      format: integer
     *                      description: Average heart rate during the workout
     *                      minimum: 0
     *                  distance:
     *                      type: number
     *                      format: integer
     *                      description: Duration of workout
     *                      minimum: 0
     *                  workoutStartedAt:
     *                      type: string
     *                      format: date-time
     *                      description: The start time of the workout
     *                  workoutEndedAt:
     *                      type: string
     *                      format: date-time
     *                      description: The end time of the workout, optional
     *                      nullable: true
     *                  speed:
     *                      type: number
     *                      format: float
     *                      description: Average speed during the workout
     *                      minimum: 0
     *                  kilocalories:
     *                      type: number
     *                      format: integer
     *                      description: Calories burned during the workout
     *                      minimum: 0
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Workout'
     *              examples:
     *                  walkingResponse:
     *                    value:
     *                      id: 1
     *                      activity: walking
     *                      steps: 3000
     *                      heartRate: 120
     *                      duration: 0
     *                      workoutStartedAt: '2021-01-01T12:00:00Z'
     *                      workoutEndedAt: '2021-01-01T12:30:00Z'
     *                      distance: 5000
     *                      speed: 2.7
     *                      kilocalories: 250
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
            body: CreateWorkoutRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.workoutService.create({
                ...options.body,
                userId: (options.user as UserAuthResponseDto).id,
            }),
        };
    }
    /**
     * @swagger
     * /api/v1/workouts/{id}:
     *    put:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *       - Workouts
     *      description: Updates workout
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Data for workout
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: number
     *                      format: integer
     *                      minimum: 1
     *                  activity:
     *                      type: string
     *                      enum:
     *                          - cycling
     *                          - running
     *                          - walking
     *                      example: walking
     *                  steps:
     *                      type: number
     *                      format: integer
     *                      description: Returns only for walking activity, optional
     *                      minimum: 0
     *                      nullable: true
     *                  heartRate:
     *                      type: number
     *                      format: integer
     *                      description: Average heart rate during the workout
     *                      minimum: 0
     *                  workoutStartedAt:
     *                      type: string
     *                      format: date-time
     *                      description: The start time of the workout
     *                  workoutEndedAt:
     *                      type: string
     *                      format: date-time
     *                      description: The end time of the workout, optional
     *                      nullable: true
     *                  distance:
     *                      type: number
     *                      format: float
     *                      description: Distance covered during the workout
     *                      minimum: 0
     *                  speed:
     *                      type: number
     *                      format: float
     *                      description: Average speed during the workout
     *                      minimum: 0
     *                  kilocalories:
     *                      type: number
     *                      format: integer
     *                      description: Calories burned during the workout
     *                      minimum: 0
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Workout'
     *              examples:
     *                  walkingResponse:
     *                    value:
     *                      id: 1
     *                      activity: walking
     *                      steps: 3000
     *                      heartRate: 120
     *                      duration: 0
     *                      workoutStartedAt: '2021-01-01T12:00:00Z'
     *                      workoutEndedAt: '2021-01-01T12:30:00Z'
     *                      distance: 5000
     *                      speed: 2.7
     *                      kilocalories: 250
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
            body: UpdateWorkoutRequestDto;
            params: EntityIdParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = idParameterValidationSchema.parse(options.params);
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.workoutService.update(
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
     * /api/v1/workouts/{id}:
     *    delete:
     *      parameters:
     *      - in: path
     *        name: id
     *        required: true
     *      tags:
     *       - Workouts
     *      description: Deletes workout
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: boolean
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
            payload: await this.workoutService.delete({ id }),
        };
    }
}

export { WorkoutController };
