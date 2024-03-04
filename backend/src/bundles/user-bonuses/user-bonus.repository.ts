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
        const referralTransaction = await this.userBonusModel
            .query()
            .findOne(query)
            .execute();

        if (!referralTransaction) {
            return null;
        }

        return UserBonusEntity.initialize(referralTransaction);
    }

    public async findAll(): Promise<UserBonusEntity[]> {
        const bonuses = await this.userBonusModel.query().execute();

        return bonuses.map((bonus) => {
            return UserBonusEntity.initialize(bonus);
        });
    }

    public async create(entity: UserBonusEntity): Promise<UserBonusEntity> {
        const { userId, action, amount } = entity.toNewObject();

        const referralTransaction = await this.userBonusModel
            .query()
            .insert({ userId, action, amount })
            .returning('*')
            .execute();

        return UserBonusEntity.initialize(referralTransaction);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserBonusRepository };
