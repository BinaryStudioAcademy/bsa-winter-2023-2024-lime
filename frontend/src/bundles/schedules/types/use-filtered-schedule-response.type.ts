import { type GoalResponseDto, type ScheduleResponseDto } from './types.js';

type UseFilteredScheduleResponse = {
    filteredSchedules: ScheduleResponseDto[];
    randomGoal: GoalResponseDto | undefined;
};

export { type UseFilteredScheduleResponse };
