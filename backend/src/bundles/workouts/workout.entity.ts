import { type Entity } from '~/common/types/types.js';

class WorkoutEntity implements Entity {
    private 'id': number | null;
    private 'workoutType': string | null;

    private constructor({
        id,
        workoutType,
    }: {
        id: number | null;
        workoutType: string | null;
    }) {
        this.id = id;
        this.workoutType = workoutType;
    }

    public static initialize({
        id,
        workoutType,
    }: {
        id: number;
        workoutType: string;
    }): WorkoutEntity {
        return new WorkoutEntity({
            id,
            workoutType,
        });
    }

    public static initializeNew({
        workoutType,
    }: {
        workoutType: string;
    }): WorkoutEntity {
        return new WorkoutEntity({
            id: null,
            workoutType,
        });
    }

    public toObject(): {
        id: number;
        workoutType: string;
    } {
        return {
            id: this.id as number,
            workoutType: this.workoutType as string,
        };
    }

    public toNewObject(): {
        workoutType: string | null;
    } {
        return {
            workoutType: this.workoutType,
        };
    }
}

export { WorkoutEntity };
