import { type RelationMappings, Model } from 'objection';

import { UserAttributes } from '~/bundles/users/enums/enums.js';
import { UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ActivityType } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

import { WorkoutAttributes } from './enums/enums.js';

class WorkoutModel extends AbstractModel {
    public 'userId': number;
    public 'activityType': ValueOf<typeof ActivityType>;
    public 'steps': number;
    public 'activityId': number;
    public 'heartRate': number | null;
    public 'workoutStartedAt': Date;
    public 'workoutEndedAt': Date;
    public 'distance': number;
    public 'speed': number;
    public 'kilocalories': number;

    public static override get tableName(): string {
        return DatabaseTableName.WORKOUTS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.WORKOUTS}.${WorkoutAttributes.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                },
            },
        };
    }
}

export { WorkoutModel };
