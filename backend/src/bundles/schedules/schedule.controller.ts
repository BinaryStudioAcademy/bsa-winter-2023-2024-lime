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
