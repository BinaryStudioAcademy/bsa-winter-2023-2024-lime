import { type ValueOf } from '~/bundles/common/types/types.js';

import { type Activity, type FrequencyType } from '../enums/enums.js';

type GoalRequestDto = {
    activity: ValueOf<typeof Activity>;
    frequency: number;
    frequencyType: ValueOf<typeof FrequencyType>;
    distance: number | null;
    duration: number | null;
};

type GoalResponseDto = {
    id: number;
    activity: ValueOf<typeof Activity>;
    frequency: number;
    frequencyType: ValueOf<typeof FrequencyType>;
    distance: number | null;
    duration: number | null;
    progress: number;
    completedAt: string | null;
};

export { type GoalRequestDto, type GoalResponseDto };
