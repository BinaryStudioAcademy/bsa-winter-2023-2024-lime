import { Select } from '~/bundles/common/components/components.js';
import {
    useAppForm,
    useFormWatch,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { BarChart } from './components/components.js';
import { CHART_TYPE_OPTIONS } from './constants/constants.js';
import { ChartType } from './enums/enums.js';
import { generateChartStats } from './helpers/generate-chart-stats.helper.js';

type Properties = {
    workouts: WorkoutResponseDto[];
};

const ChartGoalProgress: React.FC<Properties> = ({ workouts }): JSX.Element => {
    const { control, errors } = useAppForm({
        defaultValues: {
            select: ChartType.WEEKLY,
        },
        mode: 'onTouched',
    });

    const chartType = useFormWatch({
        name: 'select',
        control,
        defaultValue: ChartType.WEEKLY,
    });

    const chartData = useMemo(
        () => generateChartStats(chartType, workouts),
        [chartType, workouts],
    );

    return (
        <div className="bg-primary rounded-30 relative p-8">
            <div className="mb-4 flex h-10 items-center justify-between">
                <h1 className="text-secondary font-extrabold">
                    Workout Progress
                </h1>
                <div className="w-[100px]">
                    <Select
                        className="bg-secondary border-buttonPrimary w-[100px] rounded-md  border text-xs"
                        control={control}
                        name="select"
                        options={CHART_TYPE_OPTIONS}
                        errors={errors}
                    />
                </div>
            </div>
            <BarChart chartData={chartData} />
        </div>
    );
};

export { ChartGoalProgress };
