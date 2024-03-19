import { HttpCode, HttpError } from '~/common/http/http.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';
import { type OpenAIService } from '~/common/services/open-ai/open-ai.service.js';

import { type MessageService } from '../messages/message.service.js';
import {
    type MessageRequestDto,
    type MessageResponseDto,
} from '../messages/types/types.js';
import { MAX_CONTEXT_MESSAGE_LENGTH } from './constants/constants.js';
import { ErrorMessage } from './enums/enums.js';
import { getContextMessages } from './helpers/helpers.js';

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
        payload: MessageRequestDto,
    ): Promise<MessageResponseDto> {
        const { chatId, text } = payload;
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
            MAX_CONTEXT_MESSAGE_LENGTH,
        );

        const responseMessage = await this.openAiService.sendRequest([
            ...contextMessages,
            {
                role: SenderType.USER,
                content: text,
            },
        ]);

        return await this.messageService.create({
            chatId,
            senderId: null,
            text: responseMessage,
        });
    }
}

export { AiAssistantService };
