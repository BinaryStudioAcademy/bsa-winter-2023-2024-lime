import { type Repository } from '~/common/types/types.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatModel } from './chat.model.js';

class ChatRepository implements Repository {
    private chatModel: typeof ChatModel;

    public constructor(chatModel: typeof ChatModel) {
        this.chatModel = chatModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ChatEntity | null> {
        const chat = await this.chatModel.query().findOne(query).execute();

        return chat ? ChatEntity.initialize(chat) : null;
    }

    public async findAll(): Promise<ChatEntity[]> {
        const chats = await this.chatModel.query().execute();

        return chats.map((chat) => {
            return ChatEntity.initialize(chat);
        });
    }

    public async create(payload: ChatEntity): Promise<ChatEntity> {
        const chat = payload.toNewObject();

        const chatEntity = await this.chatModel
            .query()
            .insert(chat)
            .returning('*')
            .execute();

        return ChatEntity.initialize(chatEntity);
    }

    public async update(
        query: Record<string, unknown>,
        payload: ChatEntity,
    ): Promise<ChatEntity | null> {
        const chat = payload.toObject();

        const updatedChat = await this.chatModel
            .query()
            .patch(chat)
            .where(query)
            .returning('*')
            .first()
            .execute();

        return updatedChat ? ChatEntity.initialize(updatedChat) : null;
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const deletedRows = await this.chatModel.query().where(query).delete();

        return Boolean(deletedRows);
    }
}

export { ChatRepository };
