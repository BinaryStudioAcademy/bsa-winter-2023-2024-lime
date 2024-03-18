import { DatabaseTableName } from '~/common/database/database.js';
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
        const chat = await this.chatModel
            .query()
            .findOne(query)
            .withGraphFetched(`[${DatabaseTableName.MESSAGES}]`)
            .execute();

        return chat ? ChatEntity.initialize(chat) : null;
    }

    public async findByUser(
        query: Record<string, unknown>,
        userId: number,
    ): Promise<ChatEntity | null> {
        const chat = await this.chatModel
            .query()
            .findOne(query)
            .whereExists(
                this.chatModel
                    .relatedQuery(DatabaseTableName.USERS)
                    .where({ userId }),
            )
            .withGraphFetched(`[${DatabaseTableName.MESSAGES}]`)
            .execute();

        return chat ? ChatEntity.initialize(chat) : null;
    }

    public async findAll({
        query,
        userId,
    }: {
        query: Record<string, unknown>;
        userId: number;
    }): Promise<ChatModel[]> {
        return await this.chatModel
            .query()
            .where(query)
            .whereExists(
                this.chatModel
                    .relatedQuery(DatabaseTableName.USERS)
                    .where({ userId }),
            )
            .withGraphFetched('[users(userDetails), lastMessage]')
            .execute();
    }

    public async create(payload: ChatEntity): Promise<ChatEntity> {
        const { isAssistant, membersId } = payload.toNewObject();

        const trx = await this.chatModel.startTransaction();

        try {
            const chat = await this.chatModel
                .query(trx)
                .insert({ isAssistant })
                .returning('*')
                .withGraphFetched(`[${DatabaseTableName.MESSAGES}]`)
                .execute();

            for (const id of membersId) {
                await chat
                    .$relatedQuery(DatabaseTableName.USERS, trx)
                    .relate(id);
            }

            await trx.commit();

            return ChatEntity.initialize(chat);
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    public async update(
        query: Record<string, unknown>,
        payload: ChatEntity,
    ): Promise<ChatEntity | null> {
        const { isAssistant } = payload.toObject();

        const updatedChat = await this.chatModel
            .query()
            .patch({ isAssistant })
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
