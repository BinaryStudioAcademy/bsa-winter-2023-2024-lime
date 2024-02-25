import { type Activity } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

class WorkoutEntity implements Entity {
    private 'id': number | null;
    private 'userId': number;
    private 'activity': ValueOf<typeof Activity>;
    private 'duration': number;
    private 'steps': number;
    private 'kilocalories': number;
    private constructor({
        id,
        userId,
        activity,
        duration,
        steps,
        kilocalories,
    }: {
        id: number | null;
        userId: number;
        activity: ValueOf<typeof Activity>;
        duration: number;
        kilocalories: number;
        steps: number;
    }) {
        this.id = id;
        this.userId = userId;
        this.activity = activity;
        this.steps = steps;
        this.kilocalories = kilocalories;
        this.duration = duration;
    }

    public static initialize({
        id,
        userId,
        activity,
        duration,
        steps,
        kilocalories,
    }: {
        id: number;
        userId: number;
        activity: ValueOf<typeof Activity>;
        duration: number;
        kilocalories: number;
        steps: number;
    }): WorkoutEntity {
        return new WorkoutEntity({
            id,
            userId,
            activity,
            duration,
            steps,
            kilocalories,
        });
    }

    public static initializeNew({
        activity,
        userId,
    }: {
        activity: ValueOf<typeof Activity>;
        userId: number;
    }): WorkoutEntity {
        return new WorkoutEntity({
            id: null,
            userId,
            activity,
            duration: 0,
            steps: 0,
            kilocalories: 0,
        });
    }

    public toObject(): {
        id: number;
        activity: ValueOf<typeof Activity>;
        duration: number;
        kilocalories: number;
        steps: number;
    } {
        return {
            id: this.id as number,
            activity: this.activity,
            duration: this.duration,
            kilocalories: this.kilocalories,
            steps: this.steps,
        };
    }

    public toNewObject(): {
        userId: number;
        activity: ValueOf<typeof Activity>;
        duration: number;
        kilocalories: number;
        steps: number;
    } {
        return {
            userId: this.userId,
            activity: this.activity,
            duration: this.duration,
            kilocalories: this.kilocalories,
            steps: this.steps,
        };
    }
}

export { WorkoutEntity };
