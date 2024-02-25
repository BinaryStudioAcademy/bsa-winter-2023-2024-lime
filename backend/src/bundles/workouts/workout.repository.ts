import { type Repository } from '~/common/types/types.js';

import { type UserWorkoutsModel } from './user-workouts.model.js';
import { WorkoutEntity } from './workout.entity.js';

class WorkoutRepository implements Repository {
    private userWorkoutsModel: typeof UserWorkoutsModel;

    public constructor(userWorkoutsModel: typeof UserWorkoutsModel) {
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
        const trx = await this.userWorkoutsModel.startTransaction();

        try {
            const userWorkout = await this.userWorkoutsModel
                .query(trx)
                .insert(data)
                .returning('*')
                .execute();

            await trx.commit();

            return WorkoutEntity.initialize({
                ...userWorkout,
            });
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    public async findAll(): Promise<WorkoutEntity[]> {
        const userWorkouts = await this.userWorkoutsModel.query().execute();
        return userWorkouts.map((userWorkout) => {
            return WorkoutEntity.initialize({
                ...userWorkout,
            });
        });
    }

    public async update(
        id: number,
        entity: WorkoutEntity,
    ): Promise<WorkoutEntity | null> {
        const workout = await this.userWorkoutsModel
            .query()
            .where('id', id)
            .execute();
        if (!workout) {
            return null;
        }
        const data = entity.toNewObject();
        const trx = await this.userWorkoutsModel.startTransaction();

        try {
            const updatedUserWorkout = await this.userWorkoutsModel
                .query(trx)
                .update(data)
                .where('id', id)
                .returning('*')
                .first()
                .execute();

            await trx.commit();

            if (!updatedUserWorkout) {
                return null;
            }

            return WorkoutEntity.initialize({
                ...updatedUserWorkout,
            });
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    public async delete(id: number): Promise<boolean> {
        return !!(await this.userWorkoutsModel
            .query()
            .delete()
            .where('id', id)
            .execute());
    }
}

export { WorkoutRepository };
