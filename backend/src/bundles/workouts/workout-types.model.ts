import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class WorkoutTypesModel extends AbstractModel {
    public 'userId': number;

    public 'workoutType': string;

    public static override get tableName(): string {
        return DatabaseTableName.WORKOUT_TYPES;
    }
}

export { WorkoutTypesModel };
