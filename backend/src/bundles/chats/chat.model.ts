import { type RelationMappings, Model } from 'objection';

import { UserAttributes, UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ChatAttributes, MessageAttributes } from './enums/enums.js';
import { MessageModel } from './message.model.js';

class ChatModel extends AbstractModel {
    public 'messages': MessageModel[];

    public 'users': UserModel[];

    public static override get tableName(): string {
        return DatabaseTableName.CHATS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            messages: {
                relation: Model.HasManyRelation,
                modelClass: MessageModel,
                join: {
                    from: `${DatabaseTableName.CHATS}.${ChatAttributes.ID}`,
                    to: `${DatabaseTableName.MESSAGES}.${MessageAttributes.CHAT_ID}`,
                },
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.CHATS}.${ChatAttributes.ID}`,
                    through: {
                        from: `${DatabaseTableName.MESSAGES}.${MessageAttributes.CHAT_ID}`,
                        to: `${DatabaseTableName.MESSAGES}.${MessageAttributes.SENDER_ID}`,
                    },
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { ChatModel };
