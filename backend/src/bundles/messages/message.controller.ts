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
import {
    type DeleteChatMessagesRequestDto,
    type MessageRequestDto,
    type MessageResponseDto,
} from './types/types.js';
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

        this.addRoute({
            path: MessagePath.ID,
            method: 'DELETE',
            isProtected: true,
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{
                        body: DeleteChatMessagesRequestDto;
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
        const membersId = body.membersId ? body.membersId.map(String) : [];

        const message = await this.messageService.create(payload);

        this.socketService.sendMessage<MessageResponseDto>({
            membersId,
            payload: message,
        });

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: message,
        };
    }

    private async delete(
        options: ApiHandlerOptions<{
            body: DeleteChatMessagesRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.messageService.delete(options.body),
        };
    }
}

export { MessageController };
