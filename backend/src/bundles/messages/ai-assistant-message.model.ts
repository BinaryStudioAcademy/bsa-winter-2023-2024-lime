import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class AiAssistantMessageModel extends AbstractModel {
    public 'aiAssistantId': number;

    public 'messageId': number;

    public static override get tableName(): string {
        return DatabaseTableName.AI_ASSISTANT_MESSAGE;
    }
}

export { AiAssistantMessageModel };
