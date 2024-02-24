import {
    type ActivityType,
    type Entity,
    type Metric,
    type ValueOf,
} from './enums/enums.js';

class AchievementEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'activity': ValueOf<typeof ActivityType> | null;

    private 'requirement': number;

    private 'requirementMetric': ValueOf<typeof Metric> | null;

    private constructor({
        id,
        name,
        activity,
        requirement,
        requirementMetric,
    }: {
        id: number | null;
        name: string;
        activity: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
    }) {
        this.id = id;
        this.name = name;
        this.activity = activity;
        this.requirement = requirement;
        this.requirementMetric = requirementMetric;
    }

    public static initialize({
        id,
        name,
        activity,
        requirement,
        requirementMetric,
    }: {
        id: number;
        name: string;
        activity: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
    }): AchievementEntity {
        return new AchievementEntity({
            id,
            name,
            activity,
            requirement,
            requirementMetric,
        });
    }

    public static initializeNew({
        name,
        activity,
        requirement,
        requirementMetric,
    }: {
        name: string;
        activity: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
    }): AchievementEntity {
        return new AchievementEntity({
            id: null,
            name,
            activity,
            requirement,
            requirementMetric,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        activity: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
    } {
        return {
            id: this.id as number,
            name: this.name,
            activity: this.activity,
            requirement: this.requirement,
            requirementMetric: this.requirementMetric,
        };
    }

    public toNewObject(): {
        name: string;
        activity: ValueOf<typeof ActivityType> | null;
        requirement: number;
        requirementMetric: ValueOf<typeof Metric> | null;
    } {
        return {
            name: this.name,
            activity: this.activity,
            requirement: this.requirement,
            requirementMetric: this.requirementMetric,
        };
    }
}

export { AchievementEntity };
