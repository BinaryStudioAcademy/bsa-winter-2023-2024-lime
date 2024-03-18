import { ScheduleEntity } from '~/bundles/schedules/schedules.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Repository } from '~/common/types/types.js';

import { ScheduleValidationMessage } from './enums/enums.js';
import { type ScheduleModel } from './schedule.model.js';

class ScheduleRepository implements Repository {
    private scheduleModel: typeof ScheduleModel;
    public constructor(scheduleModel: typeof ScheduleModel) {
        this.scheduleModel = scheduleModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ScheduleEntity | null> {
        const schedule = await this.scheduleModel
            .query()
            .findOne(query)
            .execute();

        if (!schedule) {
            return null;
        }
        return ScheduleEntity.initialize({
            ...schedule,
        });
    }

    public async create(entity: ScheduleEntity): Promise<ScheduleEntity> {
        const data = entity.toNewObject();

        const schedule = await this.scheduleModel
            .query()
            .insert(data)
            .returning('*')
            .execute();

        return ScheduleEntity.initialize({
            ...schedule,
        });
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<ScheduleEntity[]> {
        const schedules = await this.scheduleModel
            .query()
            .where(query)
            .execute();
        return schedules.map((schedule) => {
            return ScheduleEntity.initialize({
                ...schedule,
            });
        });
    }

    public async update(
        query: Record<string, unknown>,
        entity: ScheduleEntity,
    ): Promise<ScheduleEntity | null> {
        const data = entity.toNewObject();

        const updatedSchedule = await this.scheduleModel
            .query()
            .update(data)
            .where(query)
            .returning('*')
            .first()
            .execute();

        if (!updatedSchedule) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ScheduleValidationMessage.NOT_FOUND,
            });
        }

        return ScheduleEntity.initialize({
            ...updatedSchedule,
        });
    }

    public async delete(query: Record<string, unknown>): Promise<number | boolean> {
        const schedule = await this.scheduleModel
            .query()
            .findOne(query)
            .execute();

        if (!schedule) {
            return false;
        }

        await this.scheduleModel
            .query()
            .delete()
            .where(query)
            .execute();

        return schedule.id;
    }
}

export { ScheduleRepository };
