import { type RelationMappings, Model } from 'objection';

import { UserAttributes, UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { MessageAttributes } from './enums/enums.js';

class MessageModel extends AbstractModel {
    public 'chatId': number;

    public 'senderId': number | null;

    public 'text': string;

    public 'isSeen': boolean;

    public 'user': UserModel;

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
        };
    }
}

export { MessageModel };
