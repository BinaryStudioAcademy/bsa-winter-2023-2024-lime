import { type RelationMappings, Model } from 'objection';

import { ChatAttributes, ChatModel } from '~/bundles/chats/chats.js';
import { UserAttributes, UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { AiAssistantAttributes } from './ai-assistants.js';

class AiAssistantModel extends AbstractModel {
    public 'userId': number;

    public 'chatId': number;

    public 'assistantId': string;

    public 'threadId': string;

    public 'user': UserModel;

    public 'chat': ChatModel;

    public static override get tableName(): string {
        return DatabaseTableName.AI_ASSISTANTS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.AI_ASSISTANTS}.${AiAssistantAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
            chat: {
                relation: Model.BelongsToOneRelation,
                modelClass: ChatModel,
                join: {
                    from: `${DatabaseTableName.AI_ASSISTANTS}.${AiAssistantAttributes.CHAT_ID}`,
                    to: `${DatabaseTableName.CHATS}.${ChatAttributes.ID}`,
                },
            },
        };
    }
}

export { AiAssistantModel };
