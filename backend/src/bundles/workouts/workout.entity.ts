import { type Entity } from '~/common/types/types.js';

class WorkoutEntity implements Entity {
    private 'id': number | null;
    private 'duration': number | null;
    private 'steps': number | null;
    private 'kilocalories': number | null;
    private constructor({
        id,
        duration,
        steps,
        kilocalories
    }: {
        id: number | null;
        duration: number | null
        kilocalories: number | null
        steps: number | null
    }) {
        this.id = id;
        this.steps = steps;
        this.kilocalories = kilocalories;
        this.duration = duration;
    }

    public static initialize({
        id,
        duration,
        steps,
        kilocalories
    }: {
        id: number;
        duration: number
        kilocalories: number
        steps: number
    }): WorkoutEntity {
        return new WorkoutEntity({
            id,
            duration,
            steps,
            kilocalories
        });
    }

    public static initializeNew({
        steps,
        kilocalories,
        duration
    }: {
        duration: number
        kilocalories: number
        steps: number
    }): WorkoutEntity {
        return new WorkoutEntity({
            id: null,
            duration,
            steps,
            kilocalories
        });
    }

    public toObject(): {
        id: number;
        duration: number
        kilocalories: number
        steps: number
    } {
        return {
            id: this.id as number,
            duration: this.duration as number,
            kilocalories: this.kilocalories as number,
            steps: this.steps as number
        };
    }

    public toNewObject(): {
        duration: number | null
        kilocalories: number | null
        steps: number | null
    } {
        return {
            duration: this.duration,
            kilocalories: this.kilocalories,
            steps: this.steps
        };
    }
}

export { WorkoutEntity };
