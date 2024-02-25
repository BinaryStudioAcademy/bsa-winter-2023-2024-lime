import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type Activity } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

class UserWorkoutsModel extends AbstractModel {
    public 'userId': number;
    public 'activity': ValueOf<typeof Activity>;
    public 'steps': number;
    public 'duration': number;
    public 'kilocalories': number;

    public static override get tableName(): string {
        return DatabaseTableName.USER_WORKOUTS;
    }
}

export { UserWorkoutsModel };
