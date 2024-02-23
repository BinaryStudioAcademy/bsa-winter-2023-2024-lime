import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import { UserAttributes } from '~/bundles/users/enums/enums.js';
import { UserWorkoutAttributes } from '~/bundles/workouts/enums/enums.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserWorkoutsModel } from './user-workouts.model.js';

class WorkoutModel extends AbstractModel {
    public 'userId': number;
    public 'steps': number;
    public 'duration': number;
    public 'kilocalories': number;

    public static override get relationMappings(): RelationMappings {
        return {
            userWorkouts: {
                relation: Model.HasOneRelation,
                modelClass: UserWorkoutsModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.USER_WORKOUTS}.${UserWorkoutAttributes.USER_ID}`,
                },
            },
        };
    }
}

export { WorkoutModel };
