import { type Service } from '~/common/types/types.js';

import {
    type CreateWorkoutRequestDto,
    type WorkoutRequestDto,
    type WorkoutResponseDto,
} from './types/types.js';
import { WorkoutEntity } from './workout.entity.js';
import { type WorkoutRepository } from './workout.repository.js';

class WorkoutService implements Service {
    private workoutRepository: WorkoutRepository;
    public constructor(workoutRepository: WorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<WorkoutEntity | null> {
        return await this.workoutRepository.find(query);
    }
    public async findAll(): Promise<{ items: WorkoutResponseDto[] }> {
        const items = await this.workoutRepository.findAll();
        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: CreateWorkoutRequestDto,
    ): Promise<WorkoutResponseDto> {
        const workout = await this.workoutRepository.create(
            WorkoutEntity.initializeNew({
                ...payload,
            }),
        );
        return workout.toObject() as WorkoutResponseDto;
    }
    public async update(
        id: number,
        payload: WorkoutRequestDto,
    ): Promise<WorkoutResponseDto> {
        const workout = await this.workoutRepository.update(
            id,
            WorkoutEntity.initialize({
                id,
                ...payload,
            }),
        );
        return workout?.toObject() as WorkoutResponseDto;
    }
    public async delete(id: number): Promise<boolean> {
        return await this.workoutRepository.delete(id);
    }
}

export { WorkoutService };
