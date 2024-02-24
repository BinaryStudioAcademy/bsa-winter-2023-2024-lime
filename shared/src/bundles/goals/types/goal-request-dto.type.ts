import { type Activity } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';
import { type FrequencyType } from '../enums/enums.js';

type GoalRequestDto = {
    activity: ValueOf<typeof Activity>;
    frequency: number;
    frequencyType: ValueOf<typeof FrequencyType>;
    distance: number | null;
    duration: number | null;
};

export { type GoalRequestDto };
