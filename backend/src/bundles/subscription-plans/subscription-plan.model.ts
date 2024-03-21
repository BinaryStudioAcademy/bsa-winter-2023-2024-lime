import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SubscriptionAttributes } from '../subscriptions/enums/enums.js';
import { SubscriptionPlanAttributes } from './enums/enums.js';

class SubscriptionPlanModel extends AbstractModel {
    public 'name': string;

    public 'price': number;

    public 'bonusPointsPrice': number;

    public 'description': string | null;

    public 'stripeProductId': string;

    public 'stripePriceId': string;

    public static override get tableName(): string {
        return DatabaseTableName.SUBSCRIPTION_PLANS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            subscriptions: {
                relation: Model.HasManyRelation,
                modelClass: SubscriptionPlanModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTION_PLANS}.${SubscriptionPlanAttributes.ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTIONS}.${SubscriptionAttributes.PLAN_ID}`,
                },
            },
        };
    }
}

export { SubscriptionPlanModel };
