import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type ActivityType } from './enums/enums.js';

class ScheduleEntity implements Entity {
    private 'id': number | null;
    private 'userId': number;
    private 'goalId': number | undefined;
    private 'activityType': ValueOf<typeof ActivityType>;
    private 'startAt': Date;

    private constructor({
        id,
        userId,
        goalId,
        activityType,
        startAt,
    }: {
        id: number | null;
        userId: number;
        goalId?: number;
        activityType: ValueOf<typeof ActivityType>;
        startAt: Date;
    }) {
        this.id = id;
        this.userId = userId;
        this.goalId = goalId;
        this.activityType = activityType;
        this.startAt = startAt;
    }

    public static initialize(payload: {
        id: number | null;
        userId: number;
        goalId?: number;
        activityType: ValueOf<typeof ActivityType>;
        startAt: Date;
    }): ScheduleEntity {
        return new ScheduleEntity({ ...payload });
    }

    public static initializeNew(payload: {
        userId: number;
        goalId?: number;
        activityType: ValueOf<typeof ActivityType>;
        startAt: Date;
    }): ScheduleEntity {
        return new ScheduleEntity({
            id: null,
            ...payload,
        });
    }

    public toObject(): {
        id: number;
        goalId?: number;
        activityType: ValueOf<typeof ActivityType>;
        startAt: Date;
    } {
        return {
            id: this.id as number,
            activityType: this.activityType,
            goalId: this.goalId as number,
            startAt: this.startAt,
        };
    }

    public toNewObject(): {
        userId: number;
        goalId?: number;
        activityType: ValueOf<typeof ActivityType>;
        startAt: Date;
    } {
        return {
            userId: this.userId,
            activityType: this.activityType,
            goalId: this.goalId as number,
            startAt: this.startAt,
        };
    }
}

export { ScheduleEntity };
