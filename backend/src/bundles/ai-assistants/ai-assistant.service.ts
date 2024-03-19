import { HttpCode, HttpError } from '~/common/http/http.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';
import { type OpenAIService } from '~/common/services/open-ai/open-ai.service.js';

import { type MessageService } from '../messages/message.service.js';
import { type MessageResponseDto } from '../messages/types/types.js';
import { ErrorMessage } from './enums/enums.js';
import { getContextMessages } from './helpers/helpers.js';
import { type SendAiMessageRequestDto } from './types/types.js';

class AiAssistantService {
    private openAiService: OpenAIService;

    private messageService: MessageService;

    public constructor(
        openAiService: OpenAIService,
        messageService: MessageService,
    ) {
        this.openAiService = openAiService;
        this.messageService = messageService;
    }

    public async sendMessage(
        userId: number,
        payload: SendAiMessageRequestDto,
    ): Promise<MessageResponseDto> {
        const { chatId, text, contextMessagesCount } = payload;
        if (!chatId) {
            throw new HttpError({
                message: ErrorMessage.AI_CHAT_NOT_FOUND,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        const chatMessages = await this.messageService.findAll({
            chatId,
        });

        const contextMessages = getContextMessages(
            chatMessages.items,
            contextMessagesCount,
        );

        const responseMessage = await this.openAiService.sendRequest([
            ...contextMessages,
            {
                role: SenderType.USER,
                content: text,
            },
        ]);

        await this.messageService.create({
            chatId,
            senderId: userId,
            text: text,
        });

        return await this.messageService.create({
            chatId,
            senderId: null,
            text: responseMessage,
        });
    }
}

export { AiAssistantService };
