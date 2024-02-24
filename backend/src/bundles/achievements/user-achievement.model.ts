import { type RelationMappings, Model } from 'objection';

import { UserModel } from '~/bundles/users/user.model.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { AchievementModel } from '../achievements/achievement.model.js';

class UserAchievementModel extends AbstractModel {
    public 'userId': number;
    public 'achievementId': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_ACHIEVEMENTS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.USER_ACHIEVEMENTS}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
            achievement: {
                relation: Model.BelongsToOneRelation,
                modelClass: AchievementModel,
                join: {
                    from: `${DatabaseTableName.USER_ACHIEVEMENTS}.achievementId`,
                    to: `${DatabaseTableName.ACHIEVEMENTS}.id`,
                },
            },
        };
    }
}

export { UserAchievementModel };
