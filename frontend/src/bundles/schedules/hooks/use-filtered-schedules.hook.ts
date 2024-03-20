import { formatDateToIso } from '~/bundles/common/helpers/helpers.js';
import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { ZERO_VALUE } from '~/bundles/schedules/constants/constants.js';
import { isDateInRange } from '~/bundles/schedules/helpers/helpers.js';

import {
    type GoalResponseDto,
    type ScheduleResponseDto,
    type UseFilteredScheduleResponse,
} from '../types/types.js';

const useFilteredSchedules = (
    watchedDate: string[],
    schedules: ScheduleResponseDto[],
    goals: GoalResponseDto[],
): UseFilteredScheduleResponse => {
    const { filteredSchedules, randomGoal } = useMemo(() => {
        const START_TIME = 0;
        const END_TIME = 1;
        const formattedDates = watchedDate.map((item) => formatDateToIso(item));
        const range = [...new Set(formattedDates)];

        const filtered = schedules.filter((schedule) => {
            const start = range[START_TIME] ?? String(ZERO_VALUE);
            const end = range[END_TIME];

            return isDateInRange(schedule.startAt as string, start, end);
        });

        const schedulesWithGoal = filtered.filter(
            (schedule) => schedule.goalId,
        );
        const randomIndex = Math.floor(
            Math.random() * schedulesWithGoal.length,
        );
        const schedule = schedulesWithGoal[randomIndex];
        const random = goals.find((goal) => goal.id === schedule?.goalId);

        return { filteredSchedules: filtered, randomGoal: random };
    }, [watchedDate, schedules, goals]);

    return { filteredSchedules, randomGoal };
};

export { useFilteredSchedules };
