import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath, HttpCode } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';
import { type SocketService } from '~/common/services/socket/socket.service.js';

import { MessagePath } from './enums/enums.js';
import { type MessageService } from './message.service.js';
import { type MessageRequestDto } from './types/types.js';
import { messageValidationSchema } from './validation-schemas/validation-schemas.js';

class MessageController extends BaseController {
    private messageService: MessageService;

    private socketService: SocketService;

    public constructor(
        logger: Logger,
        messageService: MessageService,
        socketService: SocketService,
    ) {
        super(logger, ApiPath.MESSAGES);

        this.messageService = messageService;
        this.socketService = socketService;

        this.addRoute({
            path: MessagePath.ROOT,
            method: 'POST',
            isProtected: true,
            validation: {
                body: messageValidationSchema,
            },
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

        const membersId = [body.membersId].map(String);

        this.socketService.sendMessage<string>({
            membersId,
            payload: body.text,
        });

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.messageService.create(payload),
        };
    }
}

export { MessageController };
