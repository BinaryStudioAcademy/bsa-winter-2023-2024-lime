import { type GoalRepository } from '~/bundles/goals/goal.repository.js';
import { type Service } from '~/common/types/types.js';

import { GoalEntity } from './goal.entity.js';
import {
    type CreateGoalRequestDto,
    type GoalResponseDto,
    type UpdateGoalRequestDto,
} from './types/types.js';

class GoalService implements Service {
    private goalRepository: GoalRepository;

    public constructor(goalRepository: GoalRepository) {
        this.goalRepository = goalRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<GoalResponseDto | null> {
        const item = await this.goalRepository.find(query);
        return item ? item.toObject() : null;
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<{ items: GoalResponseDto[] }> {
        const items = await this.goalRepository.findAll(query);
        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: CreateGoalRequestDto,
    ): Promise<GoalResponseDto> {
        const item = await this.goalRepository.create(
            GoalEntity.initializeNew(payload),
        );
        return item.toObject() as GoalResponseDto;
    }

    public async update(
        query: Record<string, unknown>,
        payload: UpdateGoalRequestDto,
    ): Promise<GoalResponseDto | null> {
        const item = await this.goalRepository.update(
            query,
            GoalEntity.initializeNew(payload),
        );
        return item ? (item.toObject() as GoalResponseDto) : null;
    }

    public delete(query: Record<string, unknown>): Promise<boolean> {
        return this.goalRepository.delete(query);
    }
}

export { GoalService };
