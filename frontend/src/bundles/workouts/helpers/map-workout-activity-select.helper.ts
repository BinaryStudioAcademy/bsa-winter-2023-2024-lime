import { type WorkoutResponseDto } from 'shared';

import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';

type SelectOption = { value: string; label: string };

const mapWorkoutActivitySelect = (
    data: WorkoutResponseDto[],
): SelectOption[] => {
    const dataActivities = data.map((item) => item.activityType);
    const activities = [...new Set(dataActivities)];
    const activitiesSorted = activities.sort((a, b) => a.localeCompare(b));
    const activitiesOptions: SelectOption[] = activitiesSorted.map(
        (activity) => ({
            value: activity,
            label: capitalizeFirstLetter(activity),
        }),
    );
    activitiesOptions.unshift({ value: '', label: 'All' });

    return activitiesOptions;
};

export { mapWorkoutActivitySelect };
