import { type RelationMappings, Model } from 'objection';

import {
    AiAssistantAttributes,
    AiAssistantModel,
} from '~/bundles/ai-assistants/ai-assistants.js';
import { ChatAttributes, ChatModel } from '~/bundles/chats/chats.js';
import { UserAttributes, UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ValueOf } from '~/common/types/types.js';

import {
    type SenderType,
    AiAssistantMessageAttributes,
    MessageAttributes,
    UserMessageAttributes,
} from './enums/enums.js';

class MessageModel extends AbstractModel {
    public 'chatId': number;

    public 'senderType': ValueOf<typeof SenderType>;

    public 'text': string;

    public 'isSeen': boolean;

    public 'user': UserModel;

    public 'aiAssistant': AiAssistantModel;

    public 'chat': ChatModel;

    public static override get tableName(): string {
        return DatabaseTableName.MESSAGES;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.HasOneThroughRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.MESSAGES}.${MessageAttributes.ID}`,
                    through: {
                        from: `${DatabaseTableName.USER_MESSAGE}.${UserMessageAttributes.MESSAGE_ID}`,
                        to: `${DatabaseTableName.USER_MESSAGE}.${UserMessageAttributes.USER_ID}`,
                    },
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
            aiAssistant: {
                relation: Model.HasOneThroughRelation,
                modelClass: AiAssistantModel,
                join: {
                    from: `${DatabaseTableName.MESSAGES}.${MessageAttributes.ID}`,
                    through: {
                        from: `${DatabaseTableName.AI_ASSISTANT_MESSAGE}.${AiAssistantMessageAttributes.MESSAGE_ID}`,
                        to: `${DatabaseTableName.AI_ASSISTANT_MESSAGE}.${AiAssistantMessageAttributes.AI_ASSISTANT_ID}`,
                    },
                    to: `${DatabaseTableName.AI_ASSISTANTS}.${AiAssistantAttributes.ID}`,
                },
            },
            chat: {
                relation: Model.BelongsToOneRelation,
                modelClass: ChatModel,
                join: {
                    from: `${DatabaseTableName.MESSAGES}.${MessageAttributes.CHAT_ID}`,
                    to: `${DatabaseTableName.CHATS}.${ChatAttributes.ID}`,
                },
            },
        };
    }
}

export { MessageModel };
