import { type Repository } from '~/common/types/types.js';

import { ReferralTransactionEntity } from './referral-transaction.entity.js';
import { type ReferralTransactionModel } from './referral-transaction.model.js';

class ReferralTransactionRepository implements Repository {
    private referralTransactionsModel: typeof ReferralTransactionModel;

    public constructor(
        referralTransactionsModel: typeof ReferralTransactionModel,
    ) {
        this.referralTransactionsModel = referralTransactionsModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ReferralTransactionEntity | null> {
        const referralTransaction = await this.referralTransactionsModel
            .query()
            .findOne(query)
            .execute();

        if (!referralTransaction) {
            return null;
        }

        return ReferralTransactionEntity.initialize(referralTransaction);
    }

    public async findAll(): Promise<ReferralTransactionEntity[]> {
        const referralTransactions = await this.referralTransactionsModel
            .query()
            .execute();

        return referralTransactions.map((referralTransaction) => {
            return ReferralTransactionEntity.initialize(referralTransaction);
        });
    }

    public async create(
        entity: ReferralTransactionEntity,
    ): Promise<ReferralTransactionEntity> {
        const { userId, referralUserId, referralCode } = entity.toNewObject();

        const referralTransaction = await this.referralTransactionsModel
            .query()
            .insert({ userId, referralUserId, referralCode })
            .returning('*')
            .execute();

        return ReferralTransactionEntity.initialize(referralTransaction);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { ReferralTransactionRepository };
