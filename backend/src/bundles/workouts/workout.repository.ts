import { WorkoutEntity } from './workout.entity.js';
import { type WorkoutModel } from './workout.model.js';

class WorkoutRepository {
    private workoutModel: typeof WorkoutModel;

    public constructor(workoutModel: typeof WorkoutModel) {
        this.workoutModel = workoutModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<WorkoutEntity | null> {
        const data = await this.workoutModel.query().findOne(query).execute();
        if (!data) {
            return null;
        }

        return WorkoutEntity.initialize({
            id: data.id,
            workoutType: data.workout.workoutType,
        });
    }
}

export { WorkoutRepository };
