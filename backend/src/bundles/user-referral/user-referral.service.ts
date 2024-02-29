import { type Service } from '~/common/types/types.js';

import { UserReferralEntity } from './user-referral.entity.js';
import { type UserReferralRepository } from './user-referral.repository.js';

type ReferralTransactionResponseItem = {
    id: number;
    userId: number;
    referralUserId: number | null;
    referralCode: string;
};

class ReferralTransactionService implements Service {
    private referralTransactionRepository: UserReferralRepository;

    public constructor(referralTransactionRepository: UserReferralRepository) {
        this.referralTransactionRepository = referralTransactionRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<UserReferralEntity | null> {
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
        referralUserId: number | null;
        referralCode: string;
    }): Promise<ReferralTransactionResponseItem> {
        const referralTrnasaction =
            await this.referralTransactionRepository.create(
                UserReferralEntity.initializeNew({
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
