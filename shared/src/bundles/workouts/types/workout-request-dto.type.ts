import { type Activity } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';

type WorkoutRequestDto = {
    activity: ValueOf<typeof Activity>;
    duration: number;
    kilocalories: number;
    steps: number;
};

export { type WorkoutRequestDto };
