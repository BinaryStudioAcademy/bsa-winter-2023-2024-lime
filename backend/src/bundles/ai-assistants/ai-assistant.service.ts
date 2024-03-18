import { HttpCode, HttpError } from '~/common/http/http.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';
import { type OpenAIService } from '~/common/services/open-ai/open-ai.service.js';

import { MessageEntity } from '../messages/message.entity.js';
import { type MessageRepository } from '../messages/message.repository.js';
import { ErrorMessage } from './enums/enums.js';
import {
    type SendMessageRequestDto,
    type SendMessageResponseDto,
} from './types/types.js';

class AiAssistantService {
    private openAiService: OpenAIService;

    private messageRepository: MessageRepository;

    public constructor(
        openAiService: OpenAIService,
        messageRepository: MessageRepository,
    ) {
        this.openAiService = openAiService;
        this.messageRepository = messageRepository;
    }

    public async sendMessage({
        userId,
        chatId,
        message,
        contextMessagesCount,
    }: SendMessageRequestDto): Promise<SendMessageResponseDto> {
        if (!chatId) {
            throw new HttpError({
                message: ErrorMessage.AI_CHAT_NOT_FOUND,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        const chatMessages = await this.messageRepository.findMany({
            chatId,
        });

        const contextMessages = chatMessages
            .slice(contextMessagesCount * -1)
            .map((message) => {
                const messageObject = message.toObject();
                return {
                    role: messageObject.senderId
                        ? SenderType.USER
                        : SenderType.ASSISTANT,
                    content: messageObject.text,
                };
            });

        const responseMessage = await this.openAiService.sendRequest([
            ...contextMessages,
            {
                role: SenderType.USER,
                content: message,
            },
        ]);

        await this.messageRepository.create(
            MessageEntity.initializeNew({
                chatId,
                senderId: userId,
                text: message,
                isSeen: true,
            }),
        );

        await this.messageRepository.create(
            MessageEntity.initializeNew({
                chatId,
                senderId: null,
                text: responseMessage,
                isSeen: false,
            }),
        );

        return { message: responseMessage };
    }
}

export { AiAssistantService };
