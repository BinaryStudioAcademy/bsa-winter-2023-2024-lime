import { Select } from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    type SingleValue,
    type ValueOf,
} from '~/bundles/common/types/types.js';
import { type WorkoutShowLastType } from '~/bundles/workouts/enums/enums.js';
import { actions as workoutsActions } from '~/bundles/workouts/store/workouts.js';

import { BarChart } from './components/components.js';
import { generateChartStats } from './helpers/generate-chart-stats.helper.js';

const selectData: SelectOption[] = [
    {
        value: 'week',
        label: 'Weekly',
    },
    {
        value: 'month',
        label: 'Monthly',
    },
    {
        value: 'year',
        label: 'Yearly',
    },
];

const ChartGoalProgress = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [currentData, setCurrentData] = useState<SelectOption>(
        selectData[0] as SelectOption,
    );

    const { control, errors } = useAppForm({
        defaultValues: {
            select: currentData.value,
        },
        mode: 'onChange',
    });

    const { workouts } = useAppSelector(({ workouts }) => workouts);

    useEffect(() => {
        void dispatch(
            workoutsActions.getWorkouts(
                currentData.value as ValueOf<typeof WorkoutShowLastType>,
            ),
        );
    }, [currentData, dispatch]);

    const handleChange = useCallback((newValue: SingleValue<SelectOption>) => {
        if (newValue) {
            setCurrentData(newValue);
        }
    }, []);

    const chartData = useMemo(
        () =>
            generateChartStats(
                currentData.value as ValueOf<typeof WorkoutShowLastType>,
                workouts,
            ),
        [currentData.value, workouts],
    );

    return (
        <div className="bg-primary rounded-30 relative p-8">
            <div className="mb-4 flex h-10 items-center justify-between">
                <h1 className="text-secondary font-extrabold">Goal Progress</h1>
                <div className="w-[100px]">
                    <Select
                        className="bg-secondary border-buttonPrimary w-[100px] rounded-md  border text-xs"
                        control={control}
                        name="select"
                        options={selectData}
                        errors={errors}
                        value={currentData}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <BarChart chartData={chartData} />
        </div>
    );
};

export { ChartGoalProgress };
