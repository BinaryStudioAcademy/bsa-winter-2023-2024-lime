import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type ActivityType, type Metric, type ValueOf } from './enums/enums.js';

class AchievementModel extends AbstractModel {
    public 'name': string;
    public 'activity': ValueOf<typeof ActivityType> | null;
    public 'requirement': number;
    public 'requirementMetric': ValueOf<typeof Metric> | null;

    public static override get tableName(): string {
        return DatabaseTableName.ACHIEVEMENTS;
    }
}

export { AchievementModel };
