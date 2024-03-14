import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class AiAssistantModel extends AbstractModel {
    public 'assistantId': string;

    public 'threadId': string;

    public static override get tableName(): string {
        return DatabaseTableName.AI_ASSISTANTS;
    }
}

export { AiAssistantModel };
