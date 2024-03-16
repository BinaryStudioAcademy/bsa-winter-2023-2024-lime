import { HttpCode } from '~/common/enums/enums.js';
import { HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatRepository } from './chat.repository.js';
import { ErrorMessage } from './enums/enums.js';
import { type ChatCreateDto } from './types/types.js';

class ChatService implements Service {
    private chatRepository: ChatRepository;

    public constructor(chatRepository: ChatRepository) {
        this.chatRepository = chatRepository;
    }

    public async find(query: Record<string, unknown>): Promise<unknown> {
        const chat = await this.chatRepository.find(query);

        return chat ? chat.toObject() : null;
    }

    public async findAll({
        userId,
    }: {
        userId: number;
    }): Promise<{ items: unknown[] }> {
        const chats = await this.chatRepository.findAll({ userId });

        return {
            items: chats.map((it) => it.toObject()),
        };
    }

    public async create(payload: ChatCreateDto): Promise<unknown> {
        const { creatorId, membersId, isAssistant } = payload;

        if (isAssistant) {
            const assistantChatExists = await this.chatRepository.find({
                isAssistant,
            });

            if (assistantChatExists) {
                throw new HttpError({
                    message: ErrorMessage.AI_ASSISTANT_CHAT_EXISTS,
                    status: HttpCode.BAD_REQUEST,
                });
            }
        }

        const chatEntity = ChatEntity.initializeNew({
            isAssistant,
            membersId: membersId ? [creatorId, ...membersId] : [creatorId],
        });

        const chat = await this.chatRepository.create(chatEntity);

        return chat.toNewObject();
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
