import { type Service } from '~/common/types/types.js';

import { ReferralTransactionEntity } from './referral-transaction.entity.js';
import { type ReferralTransactionRepository } from './referral-transaction.repository.js';

type ReferralTransactionResponseItem = {
    id: number;
    userId: number;
    referralUserId: number;
    referralCode: string;
};

class ReferralTransactionService implements Service {
    private referralTransactionRepository: ReferralTransactionRepository;

    public constructor(
        referralTransactionRepository: ReferralTransactionRepository,
    ) {
        this.referralTransactionRepository = referralTransactionRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ReferralTransactionEntity | null> {
        return await this.referralTransactionRepository.find(query);
    }

    public async findAll(): Promise<{
        items: ReferralTransactionResponseItem[];
    }> {
        const items = await this.referralTransactionRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create({
        userId,
        referralUserId,
        referralCode,
    }: {
        userId: number;
        referralUserId: number;
        referralCode: string;
    }): Promise<ReferralTransactionResponseItem> {
        const referralTrnasaction =
            await this.referralTransactionRepository.create(
                ReferralTransactionEntity.initializeNew({
                    userId,
                    referralUserId,
                    referralCode,
                }),
            );

        return referralTrnasaction.toObject() as ReferralTransactionResponseItem;
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { ReferralTransactionService };
