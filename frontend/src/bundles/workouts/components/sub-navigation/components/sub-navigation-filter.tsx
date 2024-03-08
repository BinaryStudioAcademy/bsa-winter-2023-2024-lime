import { type SingleValue } from 'react-select';
import { type WorkoutResponseDto } from 'shared';

import { Select } from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    mapWorkoutActivitySelect,
    mapWorkoutYearSelect,
} from '~/bundles/workouts/helpers/helpers.js';

type SubNavigationFilterProperties = {
    items: WorkoutResponseDto[];
    setItems: (items: WorkoutResponseDto[]) => void;
};

const SubNavigationFilter = ({
    items,
    setItems,
}: SubNavigationFilterProperties): JSX.Element => {
    const [innerData, setInnerData] = useState(items);

    const yearsOptions = mapWorkoutYearSelect(innerData);
    const activitiesOptionsMap = mapWorkoutActivitySelect(innerData);
    const [activitiesOptions, setActivitiesOptions] =
        useState<SelectOption[]>(activitiesOptionsMap);

    const [selectedYear, setSelectedYear] = useState<SelectOption>(
        yearsOptions[0] as SelectOption,
    );

    const [selectedActivity, setSelectedActivity] = useState<SelectOption>(
        activitiesOptions[0] as SelectOption,
    );
    const { control, errors } = useAppForm({
        defaultValues: {
            selectYear: selectedYear.value,
            selectActivity: selectedActivity.value,
        },
        mode: 'onChange',
    });
    const filterByYear = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            if (newValue && newValue.value !== '') {
                setSelectedYear(newValue);
                const filteredItems = innerData.filter((item) => {
                    return (
                        item.workoutStartedAt.getFullYear().toString() ===
                        newValue.value.toString()
                    );
                });
                setItems(filteredItems);
                const updatedActivityOptions =
                    mapWorkoutActivitySelect(filteredItems);
                setSelectedActivity(updatedActivityOptions[0] as SelectOption);
                setActivitiesOptions(updatedActivityOptions);
            } else {
                setItems(innerData);
            }
        },
        [setItems, innerData],
    );

    const filterByActivity = useCallback(
        (newValue: SingleValue<SelectOption>) => {
            if (newValue && newValue.value !== '') {
                setSelectedActivity(newValue);
                const filteredItems = items.filter((item) => {
                    return item.activityType === newValue.value;
                });

                setItems(filteredItems);
            } else {
                setItems(innerData);
            }
        },
        [setItems, items, innerData],
    );

    const handleReset = useCallback(() => {
        const items = innerData;
        setItems(items);
        setInnerData(items);
        setSelectedActivity(activitiesOptions[0] as SelectOption);
        setSelectedYear(yearsOptions[0] as SelectOption);
    }, [setItems, innerData, activitiesOptions, yearsOptions]);

    return (
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
            <Select
                options={yearsOptions}
                value={selectedYear}
                onChange={filterByYear}
                control={control}
                label="Year"
                name="selectYear"
                errors={errors}
                className="!h-10 w-full min-w-20 flex-grow"
            />
            <Select
                options={activitiesOptions}
                value={selectedActivity}
                onChange={filterByActivity}
                control={control}
                name="selectActivity"
                label="Activity"
                errors={errors}
                className="!h-10 w-28"
            />
            <button
                onClick={handleReset}
                className="text-primary ml-2 underline"
            >
                Reset
            </button>
        </div>
    );
};

export { SubNavigationFilter };
