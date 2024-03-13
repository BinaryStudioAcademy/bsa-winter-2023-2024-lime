import { type RelationMappings, Model } from 'objection';

import { ChatAttributes, ChatModel } from '~/bundles/chats/chats.js';
import { UserAttributes, UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ValueOf } from '~/common/types/types.js';

import { type SenderType, MessageAttributes } from './enums/enums.js';

class MessageModel extends AbstractModel {
    public 'chatId': number;

    public 'senderType': ValueOf<typeof SenderType>;

    public 'senderId': number | null;

    public 'text': string;

    public 'isSeen': boolean;

    public 'user': UserModel;

    public 'chat': ChatModel;

    public static override get tableName(): string {
        return DatabaseTableName.MESSAGES;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.MESSAGES}.${MessageAttributes.SENDER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
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
