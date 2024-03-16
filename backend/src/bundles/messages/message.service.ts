import { type Service } from '~/common/types/types.js';

import { MessageEntity } from './message.entity.js';
import { type MessageRepository } from './message.repository.js';
import { type MessageCreateDto } from './types/types.js';

class MessageService implements Service {
    private messageRepository: MessageRepository;

    public constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public async find(query: Record<string, unknown>): Promise<unknown> {
        return await this.messageRepository.find(query);
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<{ items: unknown[] }> {
        return { items: await this.messageRepository.findMany(query) };
    }

    public async create(payload: MessageCreateDto): Promise<unknown> {
        return await this.messageRepository.create(
            MessageEntity.initializeNew({ ...payload, isSeen: false }),
        );
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
