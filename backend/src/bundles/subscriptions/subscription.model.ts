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

    public 'status': string;

    public 'expirationDate': Date;

    public static override get tableName(): string {
        return DatabaseTableName.SUBSCRIPTIONS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            subscriptionPlans: {
                relation: Model.HasOneRelation,
                modelClass: SubscriptionPlanModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTIONS}.${SunscriptionAttributes.PLAN_ID}`,
                    to: `${DatabaseTableName.PLANS}.${SubscriptionPlanAttributes.ID}`,
                },
            },
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTIONS}.${SunscriptionAttributes.USER_ID}`,
                    to: `${DatabaseTableName.PLANS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { SubscriptionModel };
