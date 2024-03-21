import { type RelationMappings, Model } from 'objection';

import { UserAttributes, UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ChatModel } from './chat.model.js';
import { ChatAttributes, ChatUserAttributes } from './enums/enums.js';

class ChatUserModel extends AbstractModel {
    public 'chatId': number;

    public 'userId': number;

    public 'chat': ChatModel;

    public 'user': UserModel;

    public static override get tableName(): string {
        return DatabaseTableName.CHATS_USERS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            chat: {
                relation: Model.BelongsToOneRelation,
                modelClass: ChatModel,
                join: {
                    from: `${DatabaseTableName.CHATS_USERS}.${ChatUserAttributes.CHAT_ID}`,
                    to: `${DatabaseTableName.CHATS}.${ChatAttributes.ID}`,
                },
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.CHATS_USERS}.${ChatUserAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { ChatUserModel };
