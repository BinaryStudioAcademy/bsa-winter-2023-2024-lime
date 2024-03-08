import { type ProviderName } from 'shared';

import { ActivityType } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

import { MILLISECONDS_PER_SECOND } from './constants/constants.js';

class WorkoutEntity implements Entity {
    private 'id': number | null;
    private 'userId': number;
    private 'activityType': ValueOf<typeof ActivityType>;
    private 'steps': number | undefined;
    private 'activityId': number | undefined;
    private 'heartRate': number | null;
    private 'workoutStartedAt': Date;
    private 'workoutEndedAt': Date;
    private 'distance': number;
    private 'speed': number;
    private 'kilocalories': number;
    private 'provider': ValueOf<typeof ProviderName>;
    private constructor({
        id,
        userId,
        activityType,
        activityId,
        heartRate,
        steps,
        workoutStartedAt,
        workoutEndedAt,
        distance,
        speed,
        kilocalories,
        provider,
    }: {
        id: number | null;
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        steps?: number;
        activityId?: number;
        heartRate: number | null;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
        provider: ValueOf<typeof ProviderName>;
    }) {
        this.id = id;
        this.userId = userId;
        this.activityType = activityType;
        this.heartRate = heartRate;
        this.workoutStartedAt = workoutStartedAt;
        this.workoutEndedAt = workoutEndedAt;
        this.distance = distance;
        this.speed = speed;
        this.kilocalories = kilocalories;
        this.activityId = activityId;
        this.provider = provider;
        if (activityType === ActivityType.WALKING) {
            this.steps = steps;
        }
    }

    public static initialize(payload: {
        id: number;
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        steps?: number;
        activityId?: number;
        heartRate: number | null;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
        provider: ValueOf<typeof ProviderName>;
    }): WorkoutEntity {
        return new WorkoutEntity({
            ...payload,
        });
    }

    public static initializeNew(payload: {
        activityType: ValueOf<typeof ActivityType>;
        userId: number;
        heartRate: number | null;
        distance: number;
        kilocalories: number;
        speed: number;
        activityId?: number;
        steps?: number;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        provider: ValueOf<typeof ProviderName>;
    }): WorkoutEntity {
        return new WorkoutEntity({
            id: null,
            ...payload,
        });
    }

    public toObject(): {
        id: number;
        activityType: ValueOf<typeof ActivityType>;
        steps?: number;
        heartRate: number | null;
        duration: number;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
        provider: ValueOf<typeof ProviderName>;
    } {
        return {
            id: this.id as number,
            activityType: this.activityType,
            steps: this.steps as number,
            heartRate: this.heartRate,
            duration:
                (this.workoutEndedAt.getTime() -
                    this.workoutStartedAt.getTime()) /
                MILLISECONDS_PER_SECOND,
            workoutStartedAt: this.workoutStartedAt,
            workoutEndedAt: this.workoutEndedAt,
            distance: this.distance,
            speed: this.speed,
            kilocalories: this.kilocalories,
            provider: this.provider,
        };
    }

    public toNewObject(): {
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        steps?: number;
        activityId?: number;
        heartRate: number | null;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
        provider: ValueOf<typeof ProviderName>;
    } {
        return {
            userId: this.userId,
            activityType: this.activityType,
            steps: this.steps as number,
            activityId: this.activityId as number,
            heartRate: this.heartRate,
            workoutStartedAt: this.workoutStartedAt,
            workoutEndedAt: this.workoutEndedAt,
            distance: this.distance,
            speed: this.speed,
            kilocalories: this.kilocalories,
            provider: this.provider,
        };
    }
}

export { WorkoutEntity };
