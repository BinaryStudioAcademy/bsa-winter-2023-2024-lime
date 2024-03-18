import { type UserAuthResponseDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath, HttpCode } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { type ChatService } from './chat.service.js';
import { ChatsPath } from './enums/enums.js';
import {
    type ChatRequestDto,
    type EntityIdParameterDto,
} from './types/types.js';
import { chatValidationSchema } from './validation-schemas/validation-schemas.js';

class ChatController extends BaseController {
    private chatService: ChatService;

    public constructor(logger: Logger, chatService: ChatService) {
        super(logger, ApiPath.CHATS);

        this.chatService = chatService;

        this.addRoute({
            path: ChatsPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findUserChats(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatsPath.ID,
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
            path: ChatsPath.ROOT,
            method: 'POST',
            isProtected: true,
            validation: {
                body: chatValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: ChatRequestDto;
                        user: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    private async findUserChats(
        options: ApiHandlerOptions<{
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.chatService.findAllDivided({
                userId: options.user.id,
            }),
        };
    }

    private async find(
        options: ApiHandlerOptions<{
            params: EntityIdParameterDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.chatService.find({ id: options.params.id }),
        };
    }

    private async create(
        options: ApiHandlerOptions<{
            body: ChatRequestDto;
            user: UserAuthResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { user, body } = options;
        const payload = { ...body, creatorId: user.id };

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.chatService.create(payload),
        };
    }
}

export { ChatController };
