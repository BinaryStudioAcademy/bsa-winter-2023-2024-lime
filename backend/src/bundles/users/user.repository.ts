import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { type Repository } from '~/common/types/types.js';

import { type UserDetailsModel } from './user-details.model.js';

class UserRepository implements Repository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<UserEntity | null> {
        const user = await this.userModel
            .query()
            .findOne(query)
            .withGraphFetched('userDetails')
            .execute();

        if (!user) {
            return null;
        }

        const { userDetails, ...userInfo } = user;

        return UserEntity.initialize({
            ...userInfo,
            fullName: userDetails.fullName,
            avatarUrl: userDetails.avatarUrl,
            username: userDetails.username,
            dateOfBirth: userDetails.dateOfBirth,
            weight: userDetails.weight,
            height: userDetails.height,
            gender: userDetails.gender,
            referralCode: userDetails.referralCode,
            bonusBalance: userDetails.bonusBalance,
        });
    }

    public async findWithUserDetailsJoined(
        query: Record<string, unknown>,
    ): Promise<UserEntity | null> {
        const user = await this.userModel
            .query()
            .joinRelated('userDetails')
            .findOne(query)
            .withGraphFetched('userDetails')
            .execute();

        if (!user) {
            return null;
        }

        const { userDetails, ...userInfo } = user;

        return UserEntity.initialize({
            ...userInfo,
            fullName: userDetails.fullName,
            avatarUrl: userDetails.avatarUrl,
            username: userDetails.username,
            dateOfBirth: userDetails.dateOfBirth,
            weight: userDetails.weight,
            height: userDetails.height,
            gender: userDetails.gender,
            referralCode: userDetails.referralCode,
            bonusBalance: userDetails.bonusBalance,
        });
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel
            .query()
            .withGraphFetched('userDetails')
            .execute();

        return users.map((user) => {
            const { userDetails, ...userInfo } = user;

            return UserEntity.initialize({
                ...userInfo,
                fullName: userDetails.fullName,
                avatarUrl: userDetails.avatarUrl,
                username: userDetails.username,
                dateOfBirth: userDetails.dateOfBirth,
                weight: userDetails.weight,
                height: userDetails.height,
                gender: userDetails.gender,
                referralCode: userDetails.referralCode,
                bonusBalance: userDetails.bonusBalance,
            });
        });
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, passwordHash, stripeCustomerId, referralCode } =
            entity.toNewObject();

        const trx = await this.userModel.startTransaction();

        try {
            const user = await this.userModel
                .query(trx)
                .insert({
                    email,
                    passwordHash,
                    stripeCustomerId,
                })
                .returning('*')
                .execute();

            const userDetails = await user
                .$relatedQuery('userDetails', trx)
                .insert({ referralCode })
                .returning('*')
                .execute();

            await user
                .$relatedQuery('userAchievements', trx)
                .insert({ achievementId: 1 })
                .returning('*')
                .execute();

            await trx.commit();

            return UserEntity.initialize({
                ...user,
                fullName: userDetails.fullName,
                avatarUrl: userDetails.avatarUrl,
                username: userDetails.username,
                dateOfBirth: userDetails.dateOfBirth,
                weight: userDetails.weight,
                height: userDetails.height,
                gender: userDetails.gender,
                referralCode: userDetails.referralCode,
                bonusBalance: userDetails.bonusBalance,
            });
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    public async update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): ReturnType<Repository['update']> {
        return await this.userModel
            .query()
            .patch(payload)
            .where(query)
            .returning('*')
            .first()
            .execute();
    }

    public async updateUserProfile(
        userId: number,
        payload: Partial<UserDetailsModel>,
    ): Promise<UserEntity | null> {
        const trx = await this.userModel.startTransaction();
        try {
            const user = await this.userModel.query(trx).findById(userId);

            if (!user) {
                return null;
            }

            const userDetails = await user
                .$relatedQuery('userDetails', trx)
                .patch(payload)
                .returning('*')
                .first();

            await trx.commit();

            if (!userDetails) {
                return null;
            }
            return UserEntity.initialize({
                ...user,
                fullName: userDetails.fullName,
                avatarUrl: userDetails.avatarUrl,
                username: userDetails.username,
                dateOfBirth: userDetails.dateOfBirth,
                weight: userDetails.weight,
                height: userDetails.height,
                gender: userDetails.gender,
                referralCode: userDetails.referralCode,
                bonusBalance: userDetails.bonusBalance,
            });
        } catch (error) {
            await trx.rollback();
            throw new Error(`Error updating user details: ${error}`);
        }
    }
    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserRepository };
