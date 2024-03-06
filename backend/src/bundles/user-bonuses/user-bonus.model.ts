import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ValueOf } from '~/common/types/types.js';

import { UserAttributes } from '../users/enums/user-attributes.enum.js';
import { UserModel } from '../users/user.model.js';
import {
    type UserBonusActionStatus,
    UserBonusAttributes,
} from './enums/enums.js';

class UserBonusModel extends AbstractModel {
    public 'userId': number;

    public 'actionType': ValueOf<typeof UserBonusActionStatus>;

    public 'amount': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_BONUSES;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.USER_BONUSES}.${UserBonusAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { UserBonusModel };
