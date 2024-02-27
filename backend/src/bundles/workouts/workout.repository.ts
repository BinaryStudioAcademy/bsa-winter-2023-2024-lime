import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Repository } from '~/common/types/types.js';

import { WorkoutValidationMessage } from './enums/enums.js';
import { WorkoutEntity } from './workout.entity.js';
import { type WorkoutsModel } from './workouts.model.js';

class WorkoutRepository implements Repository {
    private userWorkoutsModel: typeof WorkoutsModel;

    public constructor(userWorkoutsModel: typeof WorkoutsModel) {
        this.userWorkoutsModel = userWorkoutsModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<WorkoutEntity | null> {
        const userWorkout = await this.userWorkoutsModel
            .query()
            .findOne(query)
            .execute();

        if (!userWorkout) {
            return null;
        }
        return WorkoutEntity.initialize({
            ...userWorkout,
        });
    }

    public async create(entity: WorkoutEntity): Promise<WorkoutEntity> {
        const data = entity.toNewObject();

        const userWorkout = await this.userWorkoutsModel
            .query()
            .insert(data)
            .returning('*')
            .execute();

        return WorkoutEntity.initialize({
            ...userWorkout,
        });
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<WorkoutEntity[]> {
        const userWorkouts = await this.userWorkoutsModel
            .query()
            .where(query)
            .execute();
        return userWorkouts.map((userWorkout) => {
            return WorkoutEntity.initialize({
                ...userWorkout,
            });
        });
    }

    public async update(
        query: Record<string, unknown>,
        entity: WorkoutEntity,
    ): Promise<WorkoutEntity | null> {
        const data = entity.toNewObject();

        const updatedUserWorkout = await this.userWorkoutsModel
            .query()
            .update(data)
            .where(query)
            .returning('*')
            .first()
            .execute();

        if (!updatedUserWorkout) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: WorkoutValidationMessage.NOT_FOUND,
            });
        }

        return WorkoutEntity.initialize({
            ...updatedUserWorkout,
        });
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return !!(await this.userWorkoutsModel
            .query()
            .where(query)
            .del()
            .execute());
    }
}

export { WorkoutRepository };
