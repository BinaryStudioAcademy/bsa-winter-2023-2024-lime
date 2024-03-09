import { type WorkoutResponseDto, AppRoute, configureString } from 'shared';

import { Select } from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import {
    useAppForm,
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type SingleValue } from '~/bundles/common/types/types.js';

type SubNavigationFilterProperties = {
    items: WorkoutResponseDto[];
    setItems: (items: WorkoutResponseDto[]) => void;
    mapWorkoutActivitySelect: (items: WorkoutResponseDto[]) => SelectOption[];
    mapWorkoutYearSelect: (items: WorkoutResponseDto[]) => SelectOption[];
};

const SubNavigationFilter = ({
    items,
    setItems,
    mapWorkoutYearSelect,
    mapWorkoutActivitySelect,
}: SubNavigationFilterProperties): JSX.Element => {
    const [innerData] = useState(items);
    const [filteredItems, setFilteredItems] = useState(innerData);
    const [selectedYear, setSelectedYear] = useState<SelectOption>(
        mapWorkoutYearSelect(innerData)[0] as SelectOption,
    );

    const [activitiesOptions, setActivitiesOptions] = useState<SelectOption[]>(
        mapWorkoutActivitySelect(filteredItems),
    );

    const [selectedActivity, setSelectedActivity] = useState<SelectOption>(
        activitiesOptions[0] as SelectOption,
    );

    const navigate = useNavigate();
    const { control, errors } = useAppForm({
        defaultValues: {
            selectYear: selectedYear.value,
            selectActivity: selectedActivity.value,
        },
        mode: 'onChange',
    });

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

    const updateActivityOptions = useCallback(
        (data: WorkoutResponseDto[]) => {
            const updatedActivityOptions = mapWorkoutActivitySelect(data);
            setActivitiesOptions(updatedActivityOptions);
            setSelectedActivity(updatedActivityOptions[0] as SelectOption);
        },
        [mapWorkoutActivitySelect],
    );

    const filterByYear = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            if (newValue && newValue.value !== '') {
                setSelectedYear(newValue);
                const filtered = innerData.filter((item) => {
                    return (
                        item.workoutStartedAt.getFullYear().toString() ===
                        newValue.value.toString()
                    );
                });
                setItems(filtered);
                setFilteredItems(filtered);
                updateActivityOptions(filtered);
                goToFirstWorkout(filtered);
            } else {
                setItems(innerData);
            }
        },
        [setItems, innerData, updateActivityOptions, goToFirstWorkout],
    );

    const filterByActivity = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            if (newValue && newValue.value !== '') {
                setSelectedActivity(newValue);
                const newFilteredItems = filteredItems.filter((item) => {
                    return item.activityType === newValue.value;
                });
                setItems(newFilteredItems);
                goToFirstWorkout(newFilteredItems);
            } else {
                setSelectedActivity(activitiesOptions[0] as SelectOption);
                setItems(filteredItems);
            }
        },
        [setItems, filteredItems, activitiesOptions, goToFirstWorkout],
    );

    const handleReset = useCallback(() => {
        if (items !== innerData) {
            setItems(innerData);
        }
        updateActivityOptions(innerData);
        setFilteredItems(innerData);
        setSelectedYear(mapWorkoutYearSelect(innerData)[0] as SelectOption);
        goToFirstWorkout(innerData);
    }, [
        setItems,
        innerData,
        items,
        updateActivityOptions,
        goToFirstWorkout,
        mapWorkoutYearSelect,
    ]);

    return (
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
            <Select
                options={mapWorkoutYearSelect(innerData)}
                value={selectedYear}
                onChange={filterByYear}
                control={control}
                label="Year"
                name="selectYear"
                errors={errors}
                className="w-full min-w-20 flex-grow"
            />
            <Select
                options={activitiesOptions}
                value={selectedActivity}
                onChange={filterByActivity}
                control={control}
                name="selectActivity"
                label="Activity"
                errors={errors}
                className="w-28"
            />
            <button
                onClick={handleReset}
                className="text-primary ml-2 underline"
            >
                Reset
            </button>
            {errors.selectYear && (
                <p className="text-xs text-red-500">
                    {errors.selectYear.message}
                </p>
            )}
            {errors.selectActivity && (
                <p className="text-xs text-red-500">
                    {errors.selectActivity.message}
                </p>
            )}
        </div>
    );
};

export { SubNavigationFilter };
