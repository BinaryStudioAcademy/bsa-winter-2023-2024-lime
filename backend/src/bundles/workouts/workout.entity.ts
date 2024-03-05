import { ActivityType } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

class WorkoutEntity implements Entity {
    private 'id': number | null;
    private 'userId': number;
    private 'activityType': ValueOf<typeof ActivityType>;
    private 'steps': number | undefined;
    private 'heartRate': number;
    private 'workoutStartedAt': Date;
    private 'workoutEndedAt': Date;
    private 'distance': number;
    private 'speed': number;
    private 'kilocalories': number;

    private constructor({
        id,
        userId,
        activityType,
        heartRate,
        steps,
        workoutStartedAt,
        workoutEndedAt,
        distance,
        speed,
        kilocalories,
    }: {
        id: number | null;
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        steps?: number;
        heartRate: number;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
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
        if (activityType === ActivityType.WALKING) {
            this.steps = steps ?? 0;
        }
    }

    public static initialize(payload: {
        id: number;
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        steps?: number;
        heartRate: number;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
    }): WorkoutEntity {
        return new WorkoutEntity({
            ...payload,
        });
    }

    public static initializeNew(payload: {
        activityType: ValueOf<typeof ActivityType>;
        userId: number;
        heartRate: number;
        distance: number;
        kilocalories: number;
        speed: number;
        steps?: number;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
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
        heartRate: number;
        duration: number;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
    } {
        return {
            id: this.id as number,
            activityType: this.activityType,
            steps: this.steps as number,
            heartRate: this.heartRate,
            duration:
                (this.workoutEndedAt.getTime() -
                    this.workoutStartedAt.getTime()) /
                1000,
            workoutStartedAt: this.workoutStartedAt,
            workoutEndedAt: this.workoutEndedAt,
            distance: this.distance,
            speed: this.speed,
            kilocalories: this.kilocalories,
        };
    }

    public toNewObject(): {
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        steps?: number;
        heartRate: number;
        workoutStartedAt: Date;
        workoutEndedAt: Date;
        distance: number;
        speed: number;
        kilocalories: number;
    } {
        return {
            userId: this.userId,
            activityType: this.activityType,
            steps: this.steps as number,
            heartRate: this.heartRate,
            workoutStartedAt: this.workoutStartedAt,
            workoutEndedAt: this.workoutEndedAt,
            distance: this.distance,
            speed: this.speed,
            kilocalories: this.kilocalories,
        };
    }
}

export { WorkoutEntity };