import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserAttributes } from '../users/enums/user-attributes.enum.js';
import { UserModel } from '../users/user.model.js';
import { UserReferralAttributes } from './enums/enums.js';

class UserBonusModel extends AbstractModel {
    public 'userId': number;

    public 'action': string;

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
                    from: `${DatabaseTableName.USER_BONUSES}.${UserReferralAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { UserBonusModel };
