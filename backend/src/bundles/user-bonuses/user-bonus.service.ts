import { type Service } from '~/common/types/types.js';

import { UserBonusEntity } from './user-bonus.entity.js';
import { type UserBonusRepository } from './user-bonus.repository.js';

type UserBonusResponseItem = {
    id: number;
    userId: number;
    action: string;
    amount: number;
};

class UserBonusService implements Service {
    private referralTransactionRepository: UserBonusRepository;

    public constructor(referralTransactionRepository: UserBonusRepository) {
        this.referralTransactionRepository = referralTransactionRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<UserBonusEntity | null> {
        return await this.referralTransactionRepository.find(query);
    }

    public async findAll(): Promise<{
        items: UserBonusResponseItem[];
    }> {
        const items = await this.referralTransactionRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create({
        userId,
        action,
        amount,
    }: {
        userId: number;
        action: string;
        amount: number;
    }): Promise<UserBonusResponseItem> {
        const referralTrnasaction =
            await this.referralTransactionRepository.create(
                UserBonusEntity.initializeNew({
                    userId,
                    action,
                    amount,
                }),
            );

        return referralTrnasaction.toObject() as UserBonusResponseItem;
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserBonusService };
