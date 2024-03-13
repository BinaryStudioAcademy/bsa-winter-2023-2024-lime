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
import  { type EntityIdParameterDto } from './types/types.js';
import { idParameterValidationSchema } from './validation-schemas/validation-schemas.js';

class ScheduleController extends BaseController {
    private scheduleService: ScheduleService;
    public constructor(logger: Logger, scheduleService: ScheduleService) {
        super(logger, ApiPath.SCHEDULES);
        this.scheduleService = scheduleService;
        this.addRoute({
            path: ScheduleApiPath.ID,
            method: 'GET',
            isProtected: true,
            handler: (options) => this.find(
                options as ApiHandlerOptions<{
                    params: EntityIdParameterDto;
                }>
            )
        });
    }

    private async find(
        options: ApiHandlerOptions<{
            params: EntityIdParameterDto;
        }>
    ): Promise<ApiHandlerResponse> {
        const { id } = idParameterValidationSchema.parse(options.params);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.scheduleService.find({ id })
        };
    }
}

export { ScheduleController };
