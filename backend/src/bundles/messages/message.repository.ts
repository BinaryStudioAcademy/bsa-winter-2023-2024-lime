import { type Repository } from '~/common/types/types.js';

import { MessageEntity } from './message.entity.js';
import { type MessageModel } from './message.model.js';
import { MessageAttributes } from './messages.js';

class MessageRepository implements Repository {
    private messageModel: typeof MessageModel;

    public constructor(messageModel: typeof MessageModel) {
        this.messageModel = messageModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<MessageEntity | null> {
        const message = await this.messageModel
            .query()
            .findOne(query)
            .execute();

        return message ? MessageEntity.initialize(message) : null;
    }

    public async findMany({
        query,
        limit,
    }: {
        query: Record<string, unknown>;
        limit: number;
    }): Promise<MessageEntity[]> {
        const messages = await this.messageModel
            .query()
            .select('*')
            .where(query)
            .orderBy(MessageAttributes.CREATED_AT, 'DESC')
            .limit(limit)
            .execute();

        return messages.map((message) => {
            return MessageEntity.initialize(message);
        });
    }

    public async findAll(): Promise<MessageEntity[]> {
        const messages = await this.messageModel.query().execute();

        return messages.map((message) => {
            return MessageEntity.initialize(message);
        });
    }

    public async create(payload: MessageEntity): Promise<MessageEntity> {
        const chatEntity = await this.messageModel
            .query()
            .insert(payload.toNewObject())
            .returning('*')
            .execute();

        return MessageEntity.initialize(chatEntity);
    }

    public async update(
        query: Record<string, unknown>,
        payload: MessageEntity,
    ): Promise<MessageEntity | null> {
        const message = payload.toObject();

        const updatedMessage = await this.messageModel
            .query()
            .patch(message)
            .where(query)
            .returning('*')
            .first()
            .execute();

        return updatedMessage ? MessageEntity.initialize(updatedMessage) : null;
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const deletedRows = await this.messageModel
            .query()
            .where(query)
            .delete();

        return Boolean(deletedRows);
    }
}

export { MessageRepository };
