import { type SingleValue } from 'react-select';
import { type WorkoutResponseDto, AppRoute, configureString } from 'shared';

import { type SelectOption } from '~/bundles/common/components/select/types/select.type.js';
import {
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import {
    mapWorkoutActivitySelect,
    mapWorkoutYearSelect,
} from '../helpers/helpers.js';
import { type UseFilterWorkout } from '../types/use-filter-workout.type.js';

const useFilterWorkout = (workouts: WorkoutResponseDto[]): UseFilterWorkout => {
    const sortedItems = workouts.toSorted((a, b) => {
        return b.workoutStartedAt.getTime() - a.workoutStartedAt.getTime();
    });
    const [filteredWorkouts, setFilteredWorkouts] =
        useState<WorkoutResponseDto[]>(sortedItems);
    const [options, setOptions] = useState<UseFilterWorkout['options']>({
        year: {
            items: mapWorkoutYearSelect(sortedItems),
            selected: mapWorkoutYearSelect(sortedItems)[0] || {
                value: '',
                label: '',
            },
        },
        activity: {
            items: mapWorkoutActivitySelect(sortedItems),
            selected: mapWorkoutActivitySelect(sortedItems)[0] || {
                value: '',
                label: '',
            },
        },
    });

    const navigate = useNavigate();
    const goToFirstWorkout = useCallback(
        (data: WorkoutResponseDto[]) => {
            const firstWorkout = data[0]?.id;
            const redirectPath = configureString(AppRoute.WORKOUT_$ID, {
                id: String(firstWorkout),
            });
            firstWorkout && navigate(redirectPath);
        },
        [navigate],
    );

    const updateActivityOptions = useCallback((data: WorkoutResponseDto[]) => {
        const updatedActivityOptions = mapWorkoutActivitySelect(data);
        setOptions((previousData) => ({
            ...previousData,
            activity: {
                items: updatedActivityOptions,
                selected: updatedActivityOptions[0] || { value: '', label: '' },
            },
        }));
    }, []);

    const manageOptions = useCallback(
        (newValue: SingleValue<SelectOption>, filterType: string) => {
            if (filterType === 'year') {
                setOptions((previousData) => ({
                    ...previousData,
                    year: {
                        items: previousData.year.items,
                        selected: newValue ||
                            previousData.year.items[0] || {
                                value: '',
                                label: '',
                            },
                    },
                }));
            } else {
                setOptions((previousData) => ({
                    ...previousData,
                    activity: {
                        items: previousData.activity.items,
                        selected: newValue ||
                            previousData.activity.items[0] || {
                                value: '',
                                label: '',
                            },
                    },
                }));
            }
        },
        [],
    );

    const filterByYear = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            manageOptions(newValue, 'year');
            if (!newValue) {
                return sortedItems;
            }
            return workouts.filter((item) => {
                return (
                    item.workoutStartedAt.getFullYear().toString() ===
                    newValue.value.toString()
                );
            });
        },
        [workouts, manageOptions, sortedItems],
    );

    const filterByActivity = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            const hasSelectedYear = options.year.selected.value !== '';
            manageOptions(newValue, 'activity');
            if (!newValue || newValue.value === '') {
                if (hasSelectedYear) {
                    return workouts.filter((item) => {
                        return (
                            item.workoutStartedAt.getFullYear().toString() ===
                            options.year.selected.value.toString()
                        );
                    });
                }
                return sortedItems;
            }

            return workouts.filter((item) => {
                return hasSelectedYear
                    ? item.activityType === newValue.value &&
                          item.workoutStartedAt.getFullYear().toString() ===
                              options.year.selected.value.toString()
                    : item.activityType === newValue.value;
            });
        },
        [workouts, manageOptions, sortedItems, options.year.selected.value],
    );

    const handleReset = useCallback(() => {
        if (filteredWorkouts !== workouts) {
            setFilteredWorkouts(sortedItems);
            goToFirstWorkout(sortedItems);
        }
        setOptions((previousData) => ({
            ...previousData,
            year: {
                items: mapWorkoutYearSelect(sortedItems),
                selected: mapWorkoutYearSelect(sortedItems)[0] || {
                    value: '',
                    label: '',
                },
            },
            activity: {
                items: mapWorkoutActivitySelect(sortedItems),
                selected: mapWorkoutActivitySelect(sortedItems)[0] || {
                    value: '',
                    label: '',
                },
            },
        }));
    }, [filteredWorkouts, sortedItems, workouts, goToFirstWorkout]);

    const handleFilter = useCallback(
        (newValue: SingleValue<SelectOption>, filterType: string) => {
            const filtered =
                filterType === 'year'
                    ? filterByYear(newValue)
                    : filterByActivity(newValue);
            if (filtered && filterType === 'year') {
                updateActivityOptions(filtered);
            }
            setFilteredWorkouts(filtered);
            goToFirstWorkout(filtered);
        },
        [
            filterByYear,
            filterByActivity,
            updateActivityOptions,
            goToFirstWorkout,
        ],
    );

    return {
        options,
        filteredWorkouts,
        handles: {
            handleFilter,
            handleReset,
        },
    };
};

export { useFilterWorkout };
