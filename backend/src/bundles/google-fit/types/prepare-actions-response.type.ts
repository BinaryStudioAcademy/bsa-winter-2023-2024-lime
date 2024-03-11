import { type Action } from '../enums/enums.js';
import { type ValueOf,type WorkoutRequestDto } from './types.js';

type PrepareActionsResponse = {
    data: WorkoutRequestDto,
    action: ValueOf<typeof Action>
};

export { type PrepareActionsResponse };
