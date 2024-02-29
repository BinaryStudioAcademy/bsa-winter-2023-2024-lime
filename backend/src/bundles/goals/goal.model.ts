import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type ActivityType } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

import { type FrequencyType } from './enums/enums.js';

class GoalModel extends AbstractModel {
    public 'userId': number;

    public 'activityType': ValueOf<typeof ActivityType>;

    public 'frequency': number;

    public 'frequencyType': ValueOf<typeof FrequencyType>;

    public 'distance': number | null;

    public 'duration': number | null;

    public 'progress': number;

    public 'completedAt': string | null;

    public static override get tableName(): string {
        return DatabaseTableName.GOALS;
    }
}

export { GoalModel };
