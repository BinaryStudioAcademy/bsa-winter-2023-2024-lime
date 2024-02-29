import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';
import { type FrequencyType } from '../enums/enums.js';

type GoalRequestDto = {
    activityType: ValueOf<typeof ActivityType>;
    frequency: number;
    frequencyType: ValueOf<typeof FrequencyType>;
    distance: number | null;
    duration: number | null;
};

export { type GoalRequestDto };
