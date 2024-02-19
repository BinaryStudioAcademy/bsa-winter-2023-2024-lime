import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SubscriptionAttributes } from '../subscriptions/enums/enums.js';
import { SubscriptionsModel } from '../subscriptions/subscription.model.js';
import { UserDetailsAttributes } from './enums/user-details-attributes.enum.js';

class UserDetailsModel extends AbstractModel {
    public 'userId': number;

    public 'fullName': string;

    public static override get tableName(): string {
        return DatabaseTableName.USER_DETAILS;
    }
    public static override get relationMappings(): RelationMappings {
        return {
            subscriptions: {
                relation: Model.HasOneRelation,
                modelClass: SubscriptionsModel,
                join: {
                    from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsAttributes.SUBSCRIPTION_ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTIONS}.${SubscriptionAttributes.ID}`,
                },
            },
        };
    }
}

export { UserDetailsModel };
