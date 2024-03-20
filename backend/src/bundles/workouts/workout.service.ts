import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { WorkoutValidationMessage } from './enums/enums.js';
import {
    type WorkoutRequestDto,
    type WorkoutResponseDto,
} from './types/types.js';
import { WorkoutEntity } from './workout.entity.js';
import { type WorkoutRepository } from './workout.repository.js';
import { WorkoutShowLastType } from './workouts.js';

class WorkoutService implements Service {
    private workoutRepository: WorkoutRepository;
    public constructor(workoutRepository: WorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<WorkoutResponseDto | null> {
        const item = await this.workoutRepository.find(query);

        return item?.toObject() ?? null;
    }
    public async findAll(
        query: Record<string, unknown>,
    ): Promise<{ items: WorkoutResponseDto[] }> {
        const items = await this.workoutRepository.findAll(query);
        return {
            items: items.map((it) => it.toObject()),
        };
    }
    public async findAllByUserIdAndCurrentMonth(
        userId: number,
    ): Promise<{ items: WorkoutResponseDto[] }> {
        const date = new Date();
        const currentMonth = date.getMonth();

        const items = await this.workoutRepository.findAllByUserIdAndMonth(
            userId,
            currentMonth,
        );

        return {
            items: items.map((it) => it.toObject()),
        };
    }
    public async getStats({
        userId,
        showLast,
    }: {
        userId: number;
        showLast: string;
    }): Promise<unknown> {
        const startDate = new Date();
        const endDate = new Date();

        startDate.setHours(0, 0, 0, 0);

        switch (showLast) {
            case WorkoutShowLastType.WEEK: {
                startDate.setDate(endDate.getDate() - endDate.getDay() + 1);
                break;
            }
            case WorkoutShowLastType.MONTH: {
                startDate.setDate(1);
                break;
            }

            case WorkoutShowLastType.YEAR: {
                startDate.setMonth(0);
                startDate.setDate(1);
                break;
            }
        }

        const items = await this.workoutRepository.findWithTimestamps(
            {
                userId,
            },
            startDate.toISOString(),
            endDate.toISOString(),
        );

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
