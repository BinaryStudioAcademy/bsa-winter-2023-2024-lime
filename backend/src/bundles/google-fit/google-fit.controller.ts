import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/types/types.js';

import { ApiPath, GoogleFitPath } from './enums/enums.js';
import { type GoogleFitService } from './google-fit.service.js';
import { type UserAuthResponseDto } from './types/types.js';

class GoogleFitController extends BaseController {
    private googleFitService: GoogleFitService;
    public constructor(logger: Logger, googleFitService: GoogleFitService) {
        super(logger, ApiPath.GOOGLE_FIT);
        this.googleFitService = googleFitService;

        this.addRoute({
            path: GoogleFitPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.getData(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    private async getData(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.googleFitService.handleData(options.user.id),
        };
    }
}

export { GoogleFitController };
