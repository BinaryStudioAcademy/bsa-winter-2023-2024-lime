import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Repository } from '~/common/types/types.js';

import { WorkoutValidationMessage } from './enums/enums.js';
import { WorkoutEntity } from './workout.entity.js';
import { type WorkoutModel } from './workout.model.js';

class WorkoutRepository implements Repository {
    private workoutsModel: typeof WorkoutModel;

    public constructor(workoutsModel: typeof WorkoutModel) {
        this.workoutsModel = workoutsModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<WorkoutEntity | null> {
        const workout = await this.workoutsModel
            .query()
            .findOne(query)
            .execute();

        if (!workout) {
            return null;
        }
        return WorkoutEntity.initialize({
            ...workout,
        });
    }

    public async create(entity: WorkoutEntity): Promise<WorkoutEntity> {
        const data = entity.toNewObject();

        const workout = await this.workoutsModel
            .query()
            .insert(data)
            .returning('*')
            .execute();

        return WorkoutEntity.initialize({
            ...workout,
        });
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<WorkoutEntity[]> {
        const workouts = await this.workoutsModel
            .query()
            .where(query)
            .execute();
        return workouts.map((workout) => {
            return WorkoutEntity.initialize({
                ...workout,
            });
        });
    }

    public async findAllByUserIdAndMonth(
        userId: number,
        currentMonth: number,
    ): Promise<WorkoutEntity[]> {
        const workouts = await this.workoutsModel
            .query()
            .where({ userId })
            .andWhereRaw(
                `EXTRACT(MONTH FROM workout_started_at) = ${currentMonth + 1}`,
            )
            .execute();

        return workouts.map((workout) =>
            WorkoutEntity.initialize({ ...workout }),
        );
    }

    public async update(
        query: Record<string, unknown>,
        entity: WorkoutEntity,
    ): Promise<WorkoutEntity | null> {
        const data = entity.toNewObject();

        const updatedWorkout = await this.workoutsModel
            .query()
            .update(data)
            .where(query)
            .returning('*')
            .first()
            .execute();

        if (!updatedWorkout) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: WorkoutValidationMessage.NOT_FOUND,
            });
        }

        return WorkoutEntity.initialize({
            ...updatedWorkout,
        });
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return !!(await this.workoutsModel
            .query()
            .where(query)
            .del()
            .execute());
    }
}

export { WorkoutRepository };
