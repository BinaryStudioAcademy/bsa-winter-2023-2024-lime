import { type Repository } from '~/common/types/types.js';

import { UserReferralEntity } from './user-referral.entity.js';
import { type UserReferralModel } from './user-referral.model.js';

class UserReferralRepository implements Repository {
    private referralTransactionsModel: typeof UserReferralModel;

    public constructor(referralTransactionsModel: typeof UserReferralModel) {
        this.referralTransactionsModel = referralTransactionsModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<UserReferralEntity | null> {
        const referralTransaction = await this.referralTransactionsModel
            .query()
            .findOne(query)
            .execute();

        if (!referralTransaction) {
            return null;
        }

        return UserReferralEntity.initialize(referralTransaction);
    }

    public async findAll(): Promise<UserReferralEntity[]> {
        const referralTransactions = await this.referralTransactionsModel
            .query()
            .execute();

        return referralTransactions.map((referralTransaction) => {
            return UserReferralEntity.initialize(referralTransaction);
        });
    }

    public async create(
        entity: UserReferralEntity,
    ): Promise<UserReferralEntity> {
        const { userId, referralCode } = entity.toNewObject();

        const referralTransaction = await this.referralTransactionsModel
            .query()
            .insert({ userId, referralCode })
            .returning('*')
            .execute();

        return UserReferralEntity.initialize(referralTransaction);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserReferralRepository };
