import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { ScheduleValidationMessage } from './enums/enums.js';
import { ScheduleEntity } from './schedule.entity.js';
import { type ScheduleRepository } from './schedule.repository.js';
import {
    type ScheduleGetAllResponseDto,
    type ScheduleRequestDto,
    type ScheduleResponseDto,
} from './types/types.js';

class ScheduleService implements Service {
    private scheduleRepository: ScheduleRepository;

    public constructor(scheduleRepository: ScheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ScheduleResponseDto | null> {
        const schedule = await this.scheduleRepository.find(query);

        return schedule?.toObject() ?? null;
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<ScheduleGetAllResponseDto> {
        const schedules = await this.scheduleRepository.findAll(query);

        return {
            items: schedules.map((schedule) => schedule.toObject()),
        };
    }

    public async create(
        payload: ScheduleRequestDto,
    ): Promise<ScheduleResponseDto> {
        const schedule = await this.scheduleRepository.create(
            ScheduleEntity.initializeNew({ ...payload }),
        );

        return schedule.toObject();
    }

    public async update(
        query: Record<string, unknown>,
        payload: ScheduleRequestDto,
    ): Promise<ScheduleResponseDto> {
        const schedule = await this.scheduleRepository.update(
            query,
            ScheduleEntity.initializeNew({
                ...payload,
            }),
        );

        if (!schedule) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ScheduleValidationMessage.NOT_FOUND,
            });
        }

        return schedule.toObject();
    }

    public async delete(query: Record<string, unknown>): Promise<number | boolean> {
        const schedule = await this.scheduleRepository.find(query);

        if (!schedule) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ScheduleValidationMessage.NOT_FOUND,
            });
        }

        return await this.scheduleRepository.delete(query);
    }
}

export { ScheduleService };
