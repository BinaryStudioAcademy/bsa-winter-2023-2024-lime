import { type ActivityType } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';
import { type FrequencyType } from '../enums/enums.js';

type GoalResponseDto = {
    id: number;
    activity: ValueOf<typeof ActivityType>;
    frequency: number;
    frequencyType: ValueOf<typeof FrequencyType>;
    distance: number | null;
    duration: number | null;
    progress: number;
    completedAt: string | null;
};

export { type GoalResponseDto };
