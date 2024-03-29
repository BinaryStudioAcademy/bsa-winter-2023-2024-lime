import {
    type ActivityType,
    type Entity,
    type Metric,
    type ValueOf,
} from './enums/enums.js';

class AchievementEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'activityType': ValueOf<typeof ActivityType> | null;

    private 'requirement': number;

    private 'requirementMetric': ValueOf<typeof Metric> | null;

    private 'createdAt': string | null;

    private constructor({
        id,
        name,
        activityType,
        requirement,
        requirementMetric,
        createdAt,
    }: {
        id: number | null;
        name: string;
        activityType: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
        createdAt: string | null;
    }) {
        this.id = id;
        this.name = name;
        this.activityType = activityType;
        this.requirement = requirement;
        this.requirementMetric = requirementMetric;
        this.createdAt = createdAt;
    }

    public static initialize({
        id,
        name,
        activityType,
        requirement,
        requirementMetric,
        createdAt,
    }: {
        id: number;
        name: string;
        activityType: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
        createdAt: string | null;
    }): AchievementEntity {
        return new AchievementEntity({
            id,
            name,
            activityType,
            requirement,
            requirementMetric,
            createdAt,
        });
    }

    public static initializeNew({
        name,
        activityType,
        requirement,
        requirementMetric,
        createdAt,
    }: {
        name: string;
        activityType: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
        createdAt: string | null;
    }): AchievementEntity {
        return new AchievementEntity({
            id: null,
            name,
            activityType,
            requirement,
            requirementMetric,
            createdAt,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        activityType: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
        createdAt: string | null;
    } {
        return {
            id: this.id as number,
            name: this.name,
            activityType: this.activityType,
            requirement: this.requirement,
            requirementMetric: this.requirementMetric,
            createdAt: this.createdAt,
        };
    }

    public toNewObject(): {
        name: string;
        activityType: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
        createdAt: string | null;
    } {
        return {
            name: this.name,
            activityType: this.activityType,
            requirement: this.requirement,
            requirementMetric: this.requirementMetric,
            createdAt: this.createdAt,
        };
    }
}

export { AchievementEntity };
