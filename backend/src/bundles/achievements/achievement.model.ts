import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type ActivityType, type Metric, type ValueOf } from './enums/enums.js';
import { UserAchievementModel } from './user-achievement.model.js';

class AchievementModel extends AbstractModel {
    public 'name': string;
    public 'activityType': ValueOf<typeof ActivityType> | null;
    public 'requirement': number;
    public 'requirementMetric': ValueOf<typeof Metric> | null;

    public static override get tableName(): string {
        return DatabaseTableName.ACHIEVEMENTS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            userAchievements: {
                relation: Model.HasManyRelation,
                modelClass: UserAchievementModel,
                join: {
                    from: `${DatabaseTableName.ACHIEVEMENTS}.id`,
                    to: `${DatabaseTableName.USER_ACHIEVEMENTS}.achievementId`,
                },
            },
        };
    }
}

export { AchievementModel };
