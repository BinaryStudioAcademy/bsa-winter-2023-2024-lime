import { AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import { type AchievementModel } from '~/bundles/achievements/achievement.model.js';
import { type Repository } from '~/common/types/types.js';

class AchievementRepository implements Repository {
    private achievementModel: typeof AchievementModel;

    public constructor(achievementModel: typeof AchievementModel) {
        this.achievementModel = achievementModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<AchievementEntity | null> {
        const achievement = await this.achievementModel
            .query()
            .findOne(query)
            .execute();

        if (!achievement) {
            return null;
        }
        return AchievementEntity.initialize(achievement);
    }

    public create(): ReturnType<Repository['create']> {
        return Promise.resolve(true);
    }

    public async findAll(): Promise<AchievementEntity[]> {
        const achievements = await this.achievementModel.query().execute();

        return achievements.map((achievement) => {
            return AchievementEntity.initialize(achievement);
        });
    }

    public async findById(id: number): Promise<AchievementEntity | null> {
        const achievement = await this.achievementModel
            .query()
            .findById(id)
            .execute();
        return achievement ? AchievementEntity.initialize(achievement) : null;
    }

    public async findByUserId(
        userId: number,
    ): Promise<AchievementEntity[] | null> {
        const achievements = await this.achievementModel
            .query()
            .joinRelated('userAchievements')
            .where('userAchievements.user_id', userId)
            .select('achievements.*', 'userAchievements.created_at')
            .orderBy('userAchievements.created_at', 'desc');

        return achievements.map((achievement) =>
            AchievementEntity.initialize(achievement),
        );
    }

    public async update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): ReturnType<Repository['update']> {
        return this.achievementModel
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

export { AchievementRepository };
