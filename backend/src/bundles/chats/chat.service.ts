import { HttpCode } from '~/common/enums/enums.js';
import { HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatRepository } from './chat.repository.js';
import { ErrorMessage } from './enums/enums.js';
import {
    type ChatCreateDto,
    type ChatFullResponseDto,
    type ChatGetAllItemsResponseDto,
    type ChatPreviewResponseDto,
    type ChatResponseDto,
} from './types/types.js';

class ChatService implements Service {
    private chatRepository: ChatRepository;

    public constructor(chatRepository: ChatRepository) {
        this.chatRepository = chatRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ChatFullResponseDto | null> {
        return await this.chatRepository.find(query);
    }

    public async findAll({
        userId,
    }: {
        userId: number;
    }): Promise<{ items: ChatPreviewResponseDto[] }> {
        const chats = await this.chatRepository.findAll({ query: {}, userId });

        return {
            items: chats,
        };
    }

    public async findAllDivided({
        userId,
    }: {
        userId: number;
    }): Promise<ChatGetAllItemsResponseDto> {
        const aiAssistantChat = await this.chatRepository.findAll({
            query: { isAssistant: true },
            userId,
        });

        const userChats = await this.chatRepository.findAll({
            query: { isAssistant: false },
            userId,
        });

        if (aiAssistantChat.length === 0) {
            const createdAiChat = await this.create({
                isAssistant: true,
                membersId: [userId],
                creatorId: userId,
            });
            return {
                aiAssistantChat: { ...createdAiChat, lastMessage: null },
                userChats,
            };
        }

        return {
            aiAssistantChat: aiAssistantChat[0] ?? null,
            userChats,
        };
    }

    public async create(payload: ChatCreateDto): Promise<ChatResponseDto> {
        const { creatorId, membersId, isAssistant } = payload;

        if (isAssistant) {
            const assistantChatExists = await this.chatRepository.findByUser(
                {
                    isAssistant,
                },
                creatorId,
            );

            if (assistantChatExists) {
                throw new HttpError({
                    message: ErrorMessage.AI_ASSISTANT_CHAT_EXISTS,
                    status: HttpCode.BAD_REQUEST,
                });
            }
        }

        const chatEntity = ChatEntity.initializeNew({
            isAssistant,
            membersId: membersId as number[],
        });

        return await this.chatRepository.create({ chatEntity, creatorId });
    }

    public update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<unknown> {
        return Promise.resolve({ query, payload });
    }

    public delete(payload: unknown): Promise<boolean> {
        return Promise.resolve(!!payload);
    }
}

export { ChatService };
