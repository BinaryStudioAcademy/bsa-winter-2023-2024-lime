import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserWorkoutsModel extends AbstractModel {
    public 'userId': number;
    public 'steps': number;
    public 'duration': number;
    public 'kilocalories': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_WORKOUTS;
    }
}

export { UserWorkoutsModel };
