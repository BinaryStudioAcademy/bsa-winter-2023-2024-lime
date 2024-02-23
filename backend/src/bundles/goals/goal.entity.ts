import { type Activity } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type FrequencyType } from './enums/enums.js';

class GoalEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'activity': ValueOf<typeof Activity>;

    private 'frequency': number;

    private 'frequencyType': ValueOf<typeof FrequencyType>;

    private 'distance': number | null;

    private 'duration': number | null;

    private 'progress': number;

    private 'completedAt': string | null;

    private constructor({
        id,
        userId,
        activity,
        frequency,
        frequencyType,
        distance,
        duration,
        progress,
        completedAt,
    }: {
        id: number | null;
        userId: number;
        activity: ValueOf<typeof Activity>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.activity = activity;
        this.frequency = frequency;
        this.frequencyType = frequencyType;
        this.distance = distance;
        this.duration = duration;
        this.progress = progress;
        this.completedAt = completedAt;
    }

    public static initialize({
        id,
        userId,
        activity,
        frequency,
        frequencyType,
        distance,
        duration,
        progress,
        completedAt,
    }: {
        id: number;
        userId: number;
        activity: ValueOf<typeof Activity>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
    }): GoalEntity {
        return new GoalEntity({
            id,
            userId,
            activity,
            frequency,
            frequencyType,
            distance,
            duration,
            progress,
            completedAt,
        });
    }

    public static initializeNew({
        userId,
        activity,
        frequency,
        frequencyType,
        distance,
        duration,
        progress,
        completedAt,
    }: {
        userId: number;
        activity: ValueOf<typeof Activity>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress?: number;
        completedAt?: string | null;
    }): GoalEntity {
        return new GoalEntity({
            id: null,
            userId,
            activity,
            frequency,
            frequencyType,
            distance,
            duration,
            progress: progress ?? 0,
            completedAt: completedAt ?? null,
        });
    }

    public toObject(): {
        id: number;
        activity: ValueOf<typeof Activity>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
    } {
        return {
            id: this.id as number,
            activity: this.activity,
            frequency: this.frequency,
            frequencyType: this.frequencyType,
            distance: this.distance,
            duration: this.duration,
            progress: this.progress,
            completedAt: this.completedAt,
        };
    }

    public toNewObject(): {
        userId: number;
        activity: ValueOf<typeof Activity>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
    } {
        return {
            userId: this.userId,
            activity: this.activity,
            frequency: this.frequency,
            frequencyType: this.frequencyType,
            distance: this.distance,
            duration: this.duration,
            progress: this.progress,
            completedAt: this.completedAt,
        };
    }
}

export { GoalEntity };
