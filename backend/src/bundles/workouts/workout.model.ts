import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import { UserAttributes } from '~/bundles/users/enums/enums.js';
import { WorkoutTypesAttributes } from '~/bundles/workouts/enums/enums.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { WorkoutTypesModel } from './workout-types.model.js';

class WorkoutModel extends AbstractModel {
    public 'workout': WorkoutTypesModel;

    public static override get relationMappings(): RelationMappings {
        return {
            workoutTypes: {
                relation: Model.HasOneRelation,
                modelClass: WorkoutTypesModel,
                join: {
                    from: `${DatabaseTableName.USERS}.${UserAttributes.ID}`,
                    to: `${DatabaseTableName.WORKOUT_TYPES}.${WorkoutTypesAttributes.USER_ID}`,
                },
            },
        };
    }
}

export { WorkoutModel };
