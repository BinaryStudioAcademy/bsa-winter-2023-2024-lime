import { type ActivityType } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type CreateWorkoutPayload = {
    activityType: ValueOf<typeof ActivityType>;
    workoutDate: string;
    workoutStartedAt: string;
    workoutEndedAt: string;
    speed: number | '';
    distance: number | '';
    steps: number | '';
    heartRate: number | '';
    kilocalories: number | '';
    provider: null;
};

export { type CreateWorkoutPayload };
