import { HttpCode, HttpError } from '~/common/http/http.js';
import { SenderType } from '~/common/services/open-ai/enums/enums.js';
import { type OpenAIService } from '~/common/services/open-ai/open-ai.service.js';

import { ChatEntity } from '../chats/chat.entity.js';
import { type ChatRepository } from '../chats/chat.repository.js';
import { MessageEntity } from '../messages/message.entity.js';
import { type MessageRepository } from '../messages/message.repository.js';
import { ErrorMessage } from './enums/enums.js';

class AiAssistantService {
    private openAiService: OpenAIService;

    private chatRepository: ChatRepository;

    private messageRepository: MessageRepository;

    public constructor(
        openAiService: OpenAIService,
        chatRepository: ChatRepository,
        messageRepository: MessageRepository,
    ) {
        this.openAiService = openAiService;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    private async findOrCreateChat(userId: number): Promise<ChatEntity> {
        const chat = await this.chatRepository.find({
            userId,
            isAssistant: true,
        });

        if (!chat) {
            return await this.chatRepository.create(
                ChatEntity.initializeNew({ membersId: [], isAssistant: true }),
            );
        }

        return chat;
    }

    public async sendMessage(
        userId: number,
        message: string,
        contextMessagesCount: number,
    ): Promise<{ message: string }> {
        // const chat = await this.findOrCreateChat(userId);
        // const chatObject = chat.toObject();

        const chatObject = { id: 1 };
        if (!chatObject) {
            throw new HttpError({
                message: ErrorMessage.AI_CHAT_NOT_FOUND,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        const chatMessages = await this.messageRepository.findMany({
            chatId: chatObject.id,
        });

        const contextMessages = chatMessages
            .slice(0, contextMessagesCount)
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
                chatId: chatObject.id,
                senderId: userId,
                text: message,
                isSeen: true,
            }),
        );

        await this.messageRepository.create(
            MessageEntity.initializeNew({
                chatId: chatObject.id,
                senderId: null,
                text: responseMessage,
                isSeen: false,
            }),
        );

        return { message: responseMessage };
    }
}

export { AiAssistantService };
