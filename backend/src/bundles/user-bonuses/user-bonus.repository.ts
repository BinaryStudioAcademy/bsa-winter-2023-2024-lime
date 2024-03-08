import { type Repository } from '~/common/types/types.js';

import { UserBonusEntity } from './user-bonus.entity.js';
import { type UserBonusModel } from './user-bonus.model.js';

class UserBonusRepository implements Repository {
    private userBonusModel: typeof UserBonusModel;

    public constructor(userBonusModel: typeof UserBonusModel) {
        this.userBonusModel = userBonusModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<UserBonusEntity | null> {
        const bonus = await this.userBonusModel
            .query()
            .findOne(query)
            .execute();

        if (!bonus) {
            return null;
        }

        return UserBonusEntity.initialize(bonus);
    }

    public async findAll(): Promise<UserBonusEntity[]> {
        const bonuses = await this.userBonusModel.query().execute();

        return bonuses.map((bonus) => {
            return UserBonusEntity.initialize(bonus);
        });
    }

    public async findAllByQuery(
        query: Record<string, unknown>,
    ): Promise<UserBonusEntity[]> {
        const bonuses = await this.userBonusModel
            .query()
            .where(query)
            .execute();

        return bonuses.map((bonus) => {
            return UserBonusEntity.initialize(bonus);
        });
    }

    public create(): ReturnType<Repository['create']> {
        return Promise.resolve(true);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserBonusRepository };
