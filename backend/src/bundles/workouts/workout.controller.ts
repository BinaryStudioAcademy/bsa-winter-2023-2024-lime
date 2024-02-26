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
