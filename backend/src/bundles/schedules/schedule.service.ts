import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { type NotificationService } from '../notifications/notification.service.js';
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
    private notificationService: NotificationService;
    private scheduledIds: Set<number> = new Set();

    public constructor(
        scheduleRepository: ScheduleRepository,
        notificationService: NotificationService,
    ) {
        this.scheduleRepository = scheduleRepository;
        this.notificationService = notificationService;
    }

    public async deleteOutdatedSchedules(userId: number): Promise<void> {
        const { items: schedules } = await this.findAll({ userId });
        const now = new Date().toISOString();

        for (const { startAt, id } of schedules) {
            if (new Date(startAt).toISOString() < now) {
                await this.scheduleRepository.delete({ id });
            }
        }
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
        const scheduleWithSameDate = await this.scheduleRepository.find({
            startAt: payload.startAt,
        });

        if (scheduleWithSameDate) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ScheduleValidationMessage.SCHEDULE_WITH_SAME_DATE,
            });
        }

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

    public async delete(
        query: Record<string, unknown>,
    ): Promise<number | boolean> {
        const schedule = await this.scheduleRepository.find(query);

        if (!schedule) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ScheduleValidationMessage.NOT_FOUND,
            });
        }

        return await this.scheduleRepository.delete(query);
    }

    public async createNotificationsForUpcomingSchedules(
        userId: number,
    ): Promise<void> {
        const { items: schedules } = await this.findAll({ userId });
        const ONE_HOUR_IN_MINUTES = 60;
        const CLOSE_TO_HOUR_IN_MINUTES = 59;
        const MILLISECONDS_PER_MINUTE = 60_000;

        for (const schedule of schedules) {
            if (this.scheduledIds.has(schedule.id)) {
                continue;
            }
            const startAt = new Date(schedule.startAt).getTime();
            const timeDifference = startAt - Date.now();
            if (
                timeDifference > 0 &&
                timeDifference <=
                    ONE_HOUR_IN_MINUTES * MILLISECONDS_PER_MINUTE &&
                timeDifference >=
                    CLOSE_TO_HOUR_IN_MINUTES * MILLISECONDS_PER_MINUTE
            ) {
                await this.notificationService.create({
                    userId: userId,
                    title: 'Upcoming Workout',
                    message: `Reminder: Your scheduled ${schedule.activityType} event will start in one hour. Don't miss it!`,
                    isRead: false,
                    type: 'default',
                });
                this.scheduledIds.add(schedule.id);
            }
        }
    }
}

export { ScheduleService };
