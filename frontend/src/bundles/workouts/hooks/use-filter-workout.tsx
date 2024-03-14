import { type WorkoutResponseDto, AppRoute, configureString } from 'shared';

import { type SelectOption } from '~/bundles/common/components/select/types/select.type.js';
import {
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    type SingleValue,
    type ValueOf,
} from '~/bundles/common/types/types.js';

import { filterSelectTypes } from '../enums/filter-select-types.enums.js';
import {
    mapWorkoutActivitySelect,
    mapWorkoutYearSelect,
    sortWorkoutsByDate,
} from '../helpers/helpers.js';
import { type UseFilterWorkout } from '../types/types.js';

const useFilterWorkout = (workouts: WorkoutResponseDto[]): UseFilterWorkout => {
    const sortedItems = sortWorkoutsByDate(workouts);
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
        (
            newValue: SingleValue<SelectOption>,
            filterType: ValueOf<typeof filterSelectTypes>,
        ) => {
            if (filterType === filterSelectTypes.YEAR) {
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
            manageOptions(newValue, filterSelectTypes.YEAR);
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
            manageOptions(newValue, filterSelectTypes.ACTIVITY);
            if (!newValue || newValue.value === '') {
                if (hasSelectedYear) {
                    return workouts.filter(
                        (item) =>
                            item.workoutStartedAt.getFullYear().toString() ===
                            options.year.selected.value.toString(),
                    );
                }
                return sortedItems;
            }

            const selectedYear = options.year.selected.value.toString();
            return workouts.filter((item) => {
                const itemYear = item.workoutStartedAt.getFullYear().toString();
                if (hasSelectedYear) {
                    return (
                        item.activityType === newValue.value &&
                        itemYear === selectedYear
                    );
                }
                return item.activityType === newValue.value;
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
                filterType === filterSelectTypes.YEAR
                    ? filterByYear(newValue)
                    : filterByActivity(newValue);
            if (filtered && filterType === filterSelectTypes.YEAR) {
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
