import { Activity } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

class WorkoutEntity implements Entity {
    private 'id': number | null;
    private 'userId': number;
    private 'activity': ValueOf<typeof Activity>;
    private 'steps': number | undefined;
    private 'heartRate': number;
    private 'startTime': Date;
    private 'endTime': Date | null;
    private 'distance': number;
    private 'speed': number;
    private 'kilocalories': number;

    private constructor({
        id,
        userId,
        activity,
        heartRate,
        startTime,
        endTime,
        distance,
        speed,
        kilocalories,
    }: {
        id: number | null;
        userId: number;
        activity: ValueOf<typeof Activity>;
        steps?: number;
        heartRate: number;
        startTime: Date;
        endTime: Date | null;
        distance: number;
        speed: number;
        kilocalories: number;
    }) {
        this.id = id;
        this.userId = userId;
        this.activity = activity;
        this.heartRate = heartRate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.distance = distance;
        this.speed = speed;
        this.kilocalories = kilocalories;
        if (activity === Activity.WALKING) {
            this.steps = 0;
        }
    }

    public static initialize(payload: {
        id: number;
        userId: number;
        activity: ValueOf<typeof Activity>;
        steps?: number;
        heartRate: number;
        startTime: Date;
        endTime: Date | null;
        distance: number;
        speed: number;
        kilocalories: number;
    }): WorkoutEntity {
        return new WorkoutEntity({
            ...payload,
        });
    }

    public static initializeNew(payload: {
        activity: ValueOf<typeof Activity>;
        userId: number;
        steps?: number;
    }): WorkoutEntity {
        return new WorkoutEntity({
            ...payload,
            id: null,
            heartRate: 0,
            startTime: new Date(),
            endTime: null,
            distance: 0,
            speed: 0,
            kilocalories: 0,
        });
    }

    public toObject(): {
        id: number;
        activity: ValueOf<typeof Activity>;
        steps?: number;
        heartRate: number;
        startTime: Date;
        endTime: Date | null;
        distance: number;
        speed: number;
        kilocalories: number;
    } {
        return {
            id: this.id as number,
            activity: this.activity,
            steps: this.steps as number,
            heartRate: this.heartRate,
            startTime: this.startTime,
            endTime: this.endTime,
            distance: this.distance,
            speed: this.speed,
            kilocalories: this.kilocalories,
        };
    }

    public toNewObject(): {
        userId: number;
        activity: ValueOf<typeof Activity>;
        steps?: number;
        heartRate: number;
        startTime: Date;
        endTime: Date | null;
        distance: number;
        speed: number;
        kilocalories: number;
    } {
        return {
            userId: this.userId,
            activity: this.activity,
            steps: this.steps as number,
            heartRate: this.heartRate,
            startTime: this.startTime,
            endTime: this.endTime,
            distance: this.distance,
            speed: this.speed,
            kilocalories: this.kilocalories,
        };
    }
}

export { WorkoutEntity };
