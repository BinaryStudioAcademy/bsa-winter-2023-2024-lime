import { type Service } from '~/common/types/types.js';

import { MessageEntity } from './message.entity.js';
import { type MessageRepository } from './message.repository.js';
import {
    type MessageCreateDto,
    type MessageResponseDto,
} from './types/types.js';

class MessageService implements Service {
    private messageRepository: MessageRepository;

    public constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<MessageResponseDto | null> {
        const message = await this.messageRepository.find(query);

        return message ? message.toObject() : null;
    }

    public async findAll({
        query,
        limit,
    }: {
        query: Record<string, unknown>;
        limit: number;
    }): Promise<{ items: MessageResponseDto[] }> {
        const messages = await this.messageRepository.findMany({
            query,
            limit,
        });

        return { items: messages.map((message) => message.toObject()) };
    }

    public async create(
        payload: MessageCreateDto,
    ): Promise<MessageResponseDto> {
        const message = await this.messageRepository.create(
            MessageEntity.initializeNew({ ...payload, isSeen: false }),
        );

        return message.toObject();
    }

    public update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<unknown> {
        return Promise.resolve({ query, payload });
    }

    public delete(payload: unknown): Promise<boolean> {
        return Promise.resolve(Boolean(payload));
    }
}

export { MessageService };
