import { type ValueOf, type WorkoutResponseDto } from 'shared';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

type WorkoutStateTypeSlice = {
    dataStatus: ValueOf<typeof DataStatus>;
    workouts: WorkoutResponseDto[];
};

export { type WorkoutStateTypeSlice };
