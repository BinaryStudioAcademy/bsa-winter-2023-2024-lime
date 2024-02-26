import { WorkoutsApiPath } from 'shared';

import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import {
    type CreateWorkoutRequestDto,
    type WorkoutRequestDto,
} from './types/types.js';
import {
    createUserWorkoutsValidationSchema,
    updateUserWorkoutsValidationSchema,
} from './validation-schemas/validation-schemas.js';
import { type WorkoutService } from './workout.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Workout:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          activity:
 *            type: string
 *            enum:
 *              - cycling
 *              - running
 *              - walking
 *          steps:
 *            type: number
 *            minimum: 0
 *          duration:
 *            type: number
 *            minimum: 0
 *          kilocalories:
 *            type: number
 *            minimum: 0
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
                        params: { id: string };
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
                body: createUserWorkoutsValidationSchema,
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
                body: updateUserWorkoutsValidationSchema,
            },
            isProtected: true,
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: WorkoutRequestDto;
                        params: { id: string };
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
                        params: { id: string };
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
            params: { id: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.workoutService.find({ id: options.params.id }),
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
            status: HttpCode.OK,
            payload: await this.workoutService.findAll({
                userId: (options.user as UserAuthResponseDto).id,
            }),
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
     *                 activity:
     *                     type: string
     *                     enum:
     *                        - cycling
     *                        - running
     *                        - walking
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Workout'
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
     *                 activity:
     *                     type: string
     *                     enum:
     *                        - cycling
     *                        - running
     *                        - walking
     *                 steps:
     *                     type: number
     *                     minimum: 0
     *                 duration:
     *                     type: number
     *                     minimum: 0
     *                 kilocalories:
     *                     type: number
     *                     minimum: 0
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Workout'
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
            body: WorkoutRequestDto;
            params: { id: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.workoutService.update(+options.params.id, {
                ...options.body,
                userId: (options.user as UserAuthResponseDto).id,
            }),
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
            params: { id: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.workoutService.delete(+options.params.id),
        };
    }
}

export { WorkoutController };
