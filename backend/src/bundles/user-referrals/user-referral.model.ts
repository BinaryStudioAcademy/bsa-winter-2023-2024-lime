import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserAttributes } from '../users/enums/user-attributes.enum.js';
import { UserModel } from '../users/user.model.js';
import { UserReferralAttributes } from './enums/enums.js';

class UserReferralModel extends AbstractModel {
    public 'userId': number;

    public 'referralUserId': number | null;

    public 'referralCode': string;

    public 'balance': number;

    public 'referralsCount': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_REFERRAL;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.USER_REFERRAL}.${UserReferralAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { UserReferralModel };
