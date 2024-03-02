import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { WorkoutValidationMessage } from './enums/enums.js';
import {
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
    ): Promise<WorkoutResponseDto> {
        const item = await this.workoutRepository.find(query);
        if (!item) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: WorkoutValidationMessage.NOT_FOUND,
            });
        }
        return item.toObject();
    }
    public async findAll(
        query: Record<string, unknown>,
    ): Promise<{ items: WorkoutResponseDto[] }> {
        const items = await this.workoutRepository.findAll(query);
        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: WorkoutRequestDto,
    ): Promise<WorkoutResponseDto> {
        const workout = await this.workoutRepository.create(
            WorkoutEntity.initializeNew({
                ...payload,
            }),
        );
        return workout.toObject() as WorkoutResponseDto;
    }
    public async update(
        query: Record<string, unknown>,
        payload: WorkoutRequestDto,
    ): Promise<WorkoutResponseDto> {
        const workout = await this.workoutRepository.update(
            query,
            WorkoutEntity.initializeNew({
                ...payload,
            }),
        );

        if (!workout) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: WorkoutValidationMessage.NOT_FOUND,
            });
        }

        return workout.toObject();
    }
    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const item = await this.workoutRepository.find(query);
        if (!item) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: WorkoutValidationMessage.NOT_FOUND,
            });
        }
        return await this.workoutRepository.delete(query);
    }
}

export { WorkoutService };
