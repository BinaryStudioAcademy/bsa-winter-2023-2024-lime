import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ActivityType } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

import { type OAuthProvider } from './enums/enums.js';

class WorkoutModel extends AbstractModel {
    public 'userId': number;
    public 'activityType': ValueOf<typeof ActivityType>;
    public 'steps': number;
    public 'activityId': string;
    public 'heartRate': number | null;
    public 'workoutStartedAt': Date;
    public 'workoutEndedAt': Date;
    public 'distance': number;
    public 'speed': number;
    public 'kilocalories': number;
    public 'provider': ValueOf<typeof OAuthProvider> | null;

    public static override get tableName(): string {
        return DatabaseTableName.WORKOUTS;
    }
}

export { WorkoutModel };
