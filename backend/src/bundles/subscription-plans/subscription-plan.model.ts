import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SunscriptionAttributes } from '../subscriptions/enums/enums.js';
import { SubscriptionPlanAttributes } from './enums/enums.js';

class SubscriptionPlanModel extends AbstractModel {
    public 'name': string;

    public 'price': number;

    public 'description': string;

    public 'productToken': string;

    public 'priceToken': string;

    public static override get tableName(): string {
        return DatabaseTableName.SUBSCRIPTIONS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            subscriptionPlans: {
                relation: Model.HasManyRelation,
                modelClass: SubscriptionPlanModel,
                join: {
                    from: `${DatabaseTableName.PLANS}.${SubscriptionPlanAttributes.ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTIONS}.${SunscriptionAttributes.PLAN_ID}`,
                },
            },
        };
    }
}

export { SubscriptionPlanModel };
