import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SubscriptionPlanAttributes } from '../subscription-plans/enums/enums.js';
import { SubscriptionPlanModel } from '../subscription-plans/subscription-plan.model.js';
import { UserAttributes } from '../users/enums/enums.js';
import { UserModel } from '../users/user.model.js';
import { SunscriptionAttributes } from './enums/enums.js';

class SubscriptionModel extends AbstractModel {
    public 'userId': number;

    public 'planId': number;

    public 'subscriptionToken': string;

    public 'cancelAtPeriodEnd': boolean;

    public 'status': string;

    public 'expirationDate': Date;

    public 'subscriptionPlan': SubscriptionPlanModel | null;

    public static override get tableName(): string {
        return DatabaseTableName.SUBSCRIPTIONS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            subscriptionPlan: {
                relation: Model.HasOneRelation,
                modelClass: SubscriptionPlanModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTIONS}.${SunscriptionAttributes.PLAN_ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTION_PLANS}.${SubscriptionPlanAttributes.ID}`,
                },
            },
            user: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTIONS}.${SunscriptionAttributes.USER_ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTION_PLANS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { SubscriptionModel };
