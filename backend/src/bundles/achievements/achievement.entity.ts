import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type Activities } from './enums/enums.js';

class AchievementEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'activity': ValueOf<typeof Activities>;

    private 'requirement': string;

    private constructor({
        id,
        name,
        activity,
        requirement,
    }: {
        id: number | null;
        name: string;
        activity: ValueOf<typeof Activities>;
        requirement: string;
    }) {
        this.id = id;
        this.name = name;
        this.activity = activity;
        this.requirement = requirement;
    }

    public static initialize({
        id,
        name,
        activity,
        requirement,
    }: {
        id: number;
        name: string;
        activity: ValueOf<typeof Activities>;
        requirement: string;
    }): AchievementEntity {
        return new AchievementEntity({
            id,
            name,
            activity,
            requirement,
        });
    }

    public static initializeNew({
        name,
        activity,
        requirement,
    }: {
        name: string;
        activity: ValueOf<typeof Activities>;
        requirement: string;
    }): AchievementEntity {
        return new AchievementEntity({
            id: null,
            name,
            activity,
            requirement,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        activity: ValueOf<typeof Activities>;
        requirement: string;
    } {
        return {
            id: this.id as number,
            name: this.name,
            activity: this.activity,
            requirement: this.requirement,
        };
    }

    public toNewObject(): {
        name: string;
        activity: ValueOf<typeof Activities>;
        requirement: string;
    } {
        return {
            name: this.name,
            activity: this.activity,
            requirement: this.requirement,
        };
    }
}

export { AchievementEntity };
