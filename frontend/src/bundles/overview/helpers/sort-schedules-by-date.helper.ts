import { type ScheduleResponseDto } from '~/bundles/schedules/types/types.js';

const sortSchedulesByDate = (
    schedules: ScheduleResponseDto[],
): ScheduleResponseDto[] => {
    return [...schedules].sort((a, b) => {
        return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
    });
};

export { sortSchedulesByDate };
