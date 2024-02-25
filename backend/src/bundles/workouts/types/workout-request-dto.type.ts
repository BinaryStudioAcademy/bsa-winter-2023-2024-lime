import { type Activity } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type WorkoutRequestDto = {
    userId: number;
    activity: ValueOf<typeof Activity>;
    duration: number;
    kilocalories: number;
    steps: number;
};

export { type WorkoutRequestDto };
