import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import {
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/types/types.js';

import { type AiAssistantService } from './ai-assistant.service.js';
import { AiAssistantPath } from './enums/enums.js';
import { type SendMessageRequestDto } from './types/types.js';

class AiAssistantController extends BaseController {
    private aiAssistantService: AiAssistantService;

    public constructor(logger: Logger, aiAssistantService: AiAssistantService) {
        super(logger, ApiPath.AI_ASSISTANT);

        this.aiAssistantService = aiAssistantService;

        this.addRoute({
            path: AiAssistantPath.SEND_MESSAGE,
            method: 'POST',
            handler: (options) =>
                this.sendMessage(
                    options as ApiHandlerOptions<{
                        body: SendMessageRequestDto;
                        // user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    private async sendMessage(
        options: ApiHandlerOptions<{
            body: SendMessageRequestDto;
            // user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.aiAssistantService.sendMessage(options.body),
        };
    }
}

export { AiAssistantController };
