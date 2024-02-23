import { type ValueOf } from 'shared';

import {
    type ActivityType,
    type Metric,
} from '../../../../shared/src/bundles/achievements/enums/enums.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '../../common/database/database.js';

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
