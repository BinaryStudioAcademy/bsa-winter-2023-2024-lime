import { type Service } from '~/common/types/types.js';

import { UserReferralEntity } from './user-referral.entity.js';
import { type UserReferralRepository } from './user-referral.repository.js';

type UserReferralResponseItem = {
    id: number;
    userId: number;
    referralCode: string;
    referralUserId: number | null;
    balance: number;
    referralsCount: number;
};

class UserReferralService implements Service {
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
        items: UserReferralResponseItem[];
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
    }): Promise<UserReferralResponseItem> {
        const referralTrnasaction =
            await this.referralTransactionRepository.create(
                UserReferralEntity.initializeNew({
                    userId,
                    referralUserId,
                    referralCode,
                }),
            );

        return referralTrnasaction.toObject() as UserReferralResponseItem;
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserReferralService };
