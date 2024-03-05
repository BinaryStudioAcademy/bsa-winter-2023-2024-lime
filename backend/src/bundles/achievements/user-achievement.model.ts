import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserAchievementModel extends AbstractModel {
    public 'userId': number;
    public 'achievementId': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_ACHIEVEMENTS;
    }
}

export { UserAchievementModel };
