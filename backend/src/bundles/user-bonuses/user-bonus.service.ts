import {
    type UserBonusCreateRequestDto,
    type UserBonusGetAllItemResponseDto,
    type UserBonusGetAllResponseDto,
} from './types/types.js';
import { UserBonusEntity } from './user-bonus.entity.js';
import { type UserBonusRepository } from './user-bonus.repository.js';

class UserBonusService {
    private userBonusRepository: UserBonusRepository;

    public constructor(userBonusRepository: UserBonusRepository) {
        this.userBonusRepository = userBonusRepository;
    }

    public async findMany(
        query: Record<string, unknown>,
    ): Promise<UserBonusGetAllResponseDto> {
        const items = await this.userBonusRepository.findAllByQuery(query);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: UserBonusCreateRequestDto,
    ): Promise<UserBonusGetAllItemResponseDto> {
        const userBonus = await this.userBonusRepository.create(
            UserBonusEntity.initializeNew(payload),
        );

        return userBonus.toObject();
    }
}

export { UserBonusService };
