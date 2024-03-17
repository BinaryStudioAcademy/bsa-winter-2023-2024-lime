import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath, HttpCode } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { MessagePath } from './enums/enums.js';
import { type MessageService } from './message.service.js';
import { type MessageRequestDto } from './types/types.js';

class MessageController extends BaseController {
    private messageService: MessageService;

    public constructor(logger: Logger, messageService: MessageService) {
        super(logger, ApiPath.MESSAGES);

        this.messageService = messageService;

        this.addRoute({
            path: MessagePath.ROOT,
            method: 'POST',
            isProtected: true,
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: MessageRequestDto;
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    private async create(
        options: ApiHandlerOptions<{
            body: MessageRequestDto;
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const payload = { ...body, senderId: user.id };

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.messageService.create(payload),
        };
    }
}

export { MessageController };
