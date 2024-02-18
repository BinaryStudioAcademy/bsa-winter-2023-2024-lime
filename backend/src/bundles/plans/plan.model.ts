import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SunscriptionAttributes } from '../subscriptions/enums/enums.js';
import { PlanAttributes } from './enums/enums.js';

class PlanModel extends AbstractModel {
    public 'name': string;

    public 'description': string;

    public 'productToken': string;

    public 'priceToken': string;

    public static override get tableName(): string {
        return DatabaseTableName.PLANS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            subscriptions: {
                relation: Model.HasOneRelation,
                modelClass: PlanModel,
                join: {
                    from: `${DatabaseTableName.PLANS}.${PlanAttributes.ID}`,
                    to: `${DatabaseTableName.SUBSCRIPTIONS}.${SunscriptionAttributes.PLAN_ID}`,
                },
            },
        };
    }
}

export { PlanModel };
