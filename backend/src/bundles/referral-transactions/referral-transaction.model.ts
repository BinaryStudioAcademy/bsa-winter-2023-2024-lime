import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserAttributes } from '../users/enums/user-attributes.enum.js';
import { UserModel } from '../users/user.model.js';
import { ReferralTransactionAttributes } from './enums/enums.js';

class ReferralTransactionModel extends AbstractModel {
    public 'referringUserId': number;

    public 'referredUserId': number;

    public static override get tableName(): string {
        return DatabaseTableName.ACHIEVEMENTS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.REFERRAL_TRANSACTIONS}.${ReferralTransactionAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { ReferralTransactionModel };
