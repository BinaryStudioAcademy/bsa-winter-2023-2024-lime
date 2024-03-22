import { type UserAchievementRepository } from './user-achievement.repository.js';

type CreateAchievementRequestDto = {
    userId: number;
    achievementId: number;
};

class UserAchievementService {
    private userAchievementRepository: UserAchievementRepository;

    public constructor(userAchievementRepository: UserAchievementRepository) {
        this.userAchievementRepository = userAchievementRepository;
    }

    public async create(
        payload: CreateAchievementRequestDto,
    ): Promise<unknown> {
        return await this.userAchievementRepository.create(payload);
    }
}

export { UserAchievementService };
