import { type RelationMappings,Model } from 'objection';

import { ScheduleAttributes } from '~/bundles/schedules/enums/enums.js';
import { ScheduleModel } from '~/bundles/schedules/schedules.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ActivityType } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

import { type FrequencyType, GoalAttributes } from './enums/enums.js';

class GoalModel extends AbstractModel {
    public 'userId': number;

    public 'activityType': ValueOf<typeof ActivityType>;

    public 'frequency': number;

    public 'frequencyType': ValueOf<typeof FrequencyType>;

    public 'distance': number | null;

    public 'duration': number | null;

    public 'progress': number;

    public 'completedAt': string | null;

    public 'schedules': ScheduleModel;

    public static override get tableName(): string {
        return DatabaseTableName.GOALS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            schedules: {
                relation: Model.HasManyRelation,
                modelClass: ScheduleModel,
                join: {
                    from: `${DatabaseTableName.GOALS}.${GoalAttributes.ID}`,
                    to: `${DatabaseTableName.SCHEDULES}.${ScheduleAttributes.GOAL_ID}`,
                },
            },
        };
    }
}

export { GoalModel };
