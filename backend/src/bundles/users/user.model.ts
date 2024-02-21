import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SubscriptionModel } from '../subscriptions/subscription.model.js';
import { UserAttributes, UserDetailsAttributes } from './enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string;

    public 'userDetails': UserDetailsModel;

    public 'subscriptions': SubscriptionModel;

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            userDetails: {
                relation: Model.HasOneRelation,
                modelClass: UserDetailsModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsAttributes.USER_ID}`,
                },
            },
            subscriptions: {
                relation: Model.HasOneRelation,
                modelClass: SubscriptionModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTIONS}.${UserDetailsAttributes.USER_ID}`,
                },
            },
        };
    }
}

export { UserModel };
