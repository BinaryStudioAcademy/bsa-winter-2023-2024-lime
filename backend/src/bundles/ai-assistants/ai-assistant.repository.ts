import { type Repository } from '~/common/types/types.js';

import { AiAssistantEntity } from './ai-assistant.entity.js';
import { type AiAssistantModel } from './ai-assistant.model.js';

class AiAssistantRepository implements Repository {
    private aiAssistantModel: typeof AiAssistantModel;

    public constructor(aiAssistantModel: typeof AiAssistantModel) {
        this.aiAssistantModel = aiAssistantModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<AiAssistantEntity | null> {
        const aiAssistant = await this.aiAssistantModel
            .query()
            .findOne(query)
            .execute();

        return aiAssistant ? AiAssistantEntity.initialize(aiAssistant) : null;
    }

    public async findAll(): Promise<AiAssistantEntity[]> {
        const aiAssistants = await this.aiAssistantModel.query().execute();

        return aiAssistants.map((aiAssistant) => {
            return AiAssistantEntity.initialize(aiAssistant);
        });
    }

    public async create(payload: AiAssistantEntity): Promise<unknown> {
        const chat = payload.toNewObject();

        const chatEntity = await this.aiAssistantModel
            .query()
            .insert(chat)
            .returning('*')
            .execute();

        return AiAssistantEntity.initialize(chatEntity);
    }

    public async update(
        query: Record<string, unknown>,
        payload: AiAssistantEntity,
    ): Promise<AiAssistantEntity | null> {
        const chat = payload.toObject();

        const updatedChat = await this.aiAssistantModel
            .query()
            .patch(chat)
            .where(query)
            .returning('*')
            .first()
            .execute();

        return updatedChat ? AiAssistantEntity.initialize(updatedChat) : null;
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const deletedRows = await this.aiAssistantModel
            .query()
            .where(query)
            .delete();

        return Boolean(deletedRows);
    }
}

export { AiAssistantRepository };
