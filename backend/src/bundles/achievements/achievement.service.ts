import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import { type AchievementRepository } from '~/bundles/achievements/achievement.repository.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { ErrorMessage } from './achievements.js';

class AchievementService {
    private achievementRepository: AchievementRepository;

    public constructor(achievementRepository: AchievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<AchievementEntity | null> {
        return await this.achievementRepository.find(query);
    }

    public async findAll(): Promise<AchievementEntity[]> {
        return await this.achievementRepository.findAll();
    }

    public async findById(id: number): Promise<AchievementEntity> {
        const achievement = await this.achievementRepository.findById(id);

        if (!achievement) {
            throw new HttpError({
                message: ErrorMessage.ACHIEVEMENT_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        return achievement;
    }

    public async findByUserId(
        userId: number,
    ): Promise<AchievementEntity[] | []> {
        const userAchievements =
            await this.achievementRepository.findByUserId(userId);

        if (!userAchievements || userAchievements.length === 0) {
            return [];
        }

        return userAchievements;
    }
}

export { AchievementService };
