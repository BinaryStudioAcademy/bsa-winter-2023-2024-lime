import { GoalEntity } from '~/bundles/goals/goal.entity.js';
import { type GoalModel } from '~/bundles/goals/goal.model.js';
import { type Repository } from '~/common/types/repository.type.js';

class GoalRepository implements Repository {
    private goalModel: typeof GoalModel;

    public constructor(goalModel: typeof GoalModel) {
        this.goalModel = goalModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<GoalEntity | null> {
        const goal = await this.goalModel.query().findOne(query).execute();

        if (!goal) {
            return null;
        }

        return GoalEntity.initialize(goal);
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<GoalEntity[]> {
        const goals = await this.goalModel.query().where(query).execute();

        return goals.map((goal) => GoalEntity.initialize(goal));
    }

    public async create(entity: GoalEntity): Promise<GoalEntity> {
        const goal = entity.toNewObject();
        const trx = await this.goalModel.startTransaction();

        try {
            const createdGoal = await this.goalModel
                .query(trx)
                .insert(goal)
                .returning('*')
                .execute();
            await trx.commit();

            return GoalEntity.initialize(createdGoal);
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    public async update(
        query: Record<string, unknown>,
        entity: GoalEntity,
    ): Promise<GoalEntity | null> {
        const goal = await this.goalModel.query().findOne(query).execute();

        if (!goal) {
            return null;
        }

        const newGoal = entity.toNewObject();
        const trx = await this.goalModel.startTransaction();

        try {
            const [updatedGoal] = await this.goalModel
                .query(trx)
                .where(query)
                .update(newGoal)
                .returning('*')
                .execute();
            await trx.commit();

            if (!updatedGoal) {
                return null;
            }

            return GoalEntity.initialize(updatedGoal);
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return (await this.goalModel.query().where(query).del().execute())
            ? true
            : false;
    }
}

export { GoalRepository };
