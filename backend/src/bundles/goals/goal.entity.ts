import { type ActivityType } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type FrequencyType } from './enums/enums.js';

class GoalEntity implements Entity {
    private 'id': number | null;

    private 'userId': number;

    private 'activityType': ValueOf<typeof ActivityType>;

    private 'frequency': number;

    private 'frequencyType': ValueOf<typeof FrequencyType>;

    private 'distance': number | null;

    private 'duration': number | null;

    private 'progress': number;

    private 'completedAt': string | null;

    private 'createdAt': string | null;

    private constructor({
        id,
        userId,
        activityType,
        frequency,
        frequencyType,
        distance,
        duration,
        progress,
        completedAt,
        createdAt,
    }: {
        id: number | null;
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
        createdAt: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.activityType = activityType;
        this.frequency = frequency;
        this.frequencyType = frequencyType;
        this.distance = distance;
        this.duration = duration;
        this.progress = progress;
        this.completedAt = completedAt;
        this.createdAt = createdAt;
    }

    public static initialize({
        id,
        userId,
        activityType,
        frequency,
        frequencyType,
        distance,
        duration,
        progress,
        completedAt,
        createdAt,
    }: {
        id: number;
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
        createdAt: string | null;
    }): GoalEntity {
        return new GoalEntity({
            id,
            userId,
            activityType,
            frequency,
            frequencyType,
            distance,
            duration,
            progress,
            completedAt,
            createdAt,
        });
    }

    public static initializeNew({
        userId,
        activityType,
        frequency,
        frequencyType,
        distance,
        duration,
        progress,
        completedAt,
    }: {
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
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
            activityType,
            frequency,
            frequencyType,
            distance,
            duration,
            progress: progress ?? 0,
            completedAt: completedAt ?? null,
            createdAt: null,
        });
    }

    public toObject(): {
        id: number;
        activityType: ValueOf<typeof ActivityType>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
        createdAt: string | null;
    } {
        return {
            id: this.id as number,
            activityType: this.activityType,
            frequency: this.frequency,
            frequencyType: this.frequencyType,
            distance: this.distance,
            duration: this.duration,
            progress: this.progress,
            completedAt: this.completedAt,
            createdAt: this.createdAt,
        };
    }

    public toNewObject(): {
        userId: number;
        activityType: ValueOf<typeof ActivityType>;
        frequency: number;
        frequencyType: ValueOf<typeof FrequencyType>;
        distance: number | null;
        duration: number | null;
        progress: number;
        completedAt: string | null;
    } {
        return {
            userId: this.userId,
            activityType: this.activityType,
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
