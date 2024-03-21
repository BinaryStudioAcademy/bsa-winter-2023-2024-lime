import { type Repository } from '~/common/types/repository.type.js';

import { type UserAchievementModel } from './user-achievement.model.js';

class UserAchievementRepository implements Repository {
    private userAchievementModel: typeof UserAchievementModel;

    public constructor(userAchievementModel: typeof UserAchievementModel) {
        this.userAchievementModel = userAchievementModel;
    }

    public find(): ReturnType<Repository['find']> {
        return Promise.resolve(true);
    }

    public findAll(): ReturnType<Repository['findAll']> {
        return Promise.resolve([true]);
    }

    public async create(payload: Record<number, unknown>): Promise<unknown> {
        return await this.userAchievementModel
            .query()
            .insert(payload)
            .execute();
    }

    public async update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): ReturnType<Repository['update']> {
        return await this.userAchievementModel
            .query()
            .patch(payload)
            .where(query)
            .returning('*')
            .first()
            .execute();
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserAchievementRepository };
