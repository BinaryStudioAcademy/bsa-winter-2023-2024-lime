import { type RelationMappings, Model } from 'objection';

import { GoalAttributes } from '~/bundles/goals/enums/enums.js';
import { GoalModel } from '~/bundles/goals/goals.js';
import { UserAttributes } from '~/bundles/users/enums/enums.js';
import { UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ValueOf } from '~/common/types/types.js';

import { type ActivityType } from './enums/enums.js';
import { ScheduleAttributes } from './enums/enums.js';

class ScheduleModel extends AbstractModel {
    public 'userId': number;
    public 'goalId': number | null;
    public 'activityType': ValueOf<typeof ActivityType>;
    public 'startAt': Date;

    public static override get tableName(): string {
        return DatabaseTableName.SCHEDULES;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.SCHEDULES}.${ScheduleAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
            goal: {
                relation: Model.BelongsToOneRelation,
                modelClass: GoalModel,
                join: {
                    from: `${DatabaseTableName.SCHEDULES}.${ScheduleAttributes.GOAL_ID}`,
                    to: `${DatabaseTableName.GOALS}.${GoalAttributes.ID}`,
                },
            },
        };
    }
}

export { ScheduleModel };
