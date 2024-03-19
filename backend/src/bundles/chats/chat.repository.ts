import { USER_DETAILS_RELATION } from '~/bundles/users/users.js';
import { DatabaseTableName } from '~/common/database/database.js';
import { type Repository } from '~/common/types/types.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatModel } from './chat.model.js';
import { LAST_MESSAGE_RELATION } from './constants/constants.js';
import {
    type ChatFullResponseDto,
    type ChatPreviewResponseDto,
    type ChatResponseDto,
} from './types/types.js';

class ChatRepository implements Repository {
    private chatModel: typeof ChatModel;

    public constructor(chatModel: typeof ChatModel) {
        this.chatModel = chatModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ChatFullResponseDto | null> {
        return await this.chatModel
            .query()
            .findOne(query)
            .withGraphFetched(
                `[${DatabaseTableName.USERS}(${USER_DETAILS_RELATION}), ${DatabaseTableName.MESSAGES}]`,
            )
            .castTo<ChatFullResponseDto>()
            .execute();
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
    }): Promise<ChatPreviewResponseDto[]> {
        return await this.chatModel
            .query()
            .where(query)
            .whereExists(
                this.chatModel
                    .relatedQuery(DatabaseTableName.USERS)
                    .where({ userId }),
            )
            .withGraphFetched(
                `[${DatabaseTableName.USERS}(${USER_DETAILS_RELATION}), ${LAST_MESSAGE_RELATION}]`,
            )
            .castTo<ChatPreviewResponseDto[]>()
            .execute();
    }

    public async create(payload: ChatEntity): Promise<ChatResponseDto> {
        const { isAssistant, membersId } = payload.toNewObject();

        const trx = await this.chatModel.startTransaction();

        try {
            const chat = await this.chatModel
                .query(trx)
                .insert({ isAssistant })
                .returning('*')
                .execute();

            for (const id of membersId) {
                await chat
                    .$relatedQuery(DatabaseTableName.USERS, trx)
                    .relate(id);
            }

            await trx.commit();

            return await this.chatModel
                .query()
                .findById(chat.id)
                .returning('*')
                .withGraphFetched(
                    `[${DatabaseTableName.MESSAGES}, ${DatabaseTableName.USERS}]`,
                )
                .castTo<ChatResponseDto>()
                .execute();
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
