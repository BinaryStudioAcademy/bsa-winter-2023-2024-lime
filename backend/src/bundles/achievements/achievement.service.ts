import { type AchievementEntity } from '~/bundles/achievements/achievement.entity.js';
import { type AchievementRepository } from '~/bundles/achievements/achievement.repository.js';

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

    public async findById(id: number): Promise<AchievementEntity | null> {
        return await this.achievementRepository.findById(id);
    }

    public async findByUserId(
        userId: number,
    ): Promise<AchievementEntity[] | null> {
        return await this.achievementRepository.findByUserId(userId);
    }
}

export { AchievementService };
