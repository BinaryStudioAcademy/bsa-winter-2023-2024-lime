import { type Activity } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type WorkoutResponseDto = {
    id: number;
    activity: ValueOf<typeof Activity>;
    duration: number;
    steps: number;
    kilocalories: number;
};

export { type WorkoutResponseDto };
