import { type SingleValue } from 'react-select';

import { Select } from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { BarChart } from '../components.js';

const data: SelectOption[] = [
    {
        value: 'weekly',
        label: 'Weekly',
    },
    {
        value: 'monthly',
        label: 'Monthly',
    },
    {
        value: 'yearly',
        label: 'Yearly',
    },
];

const colors = {
    workout: {
        backgroundColor: 'rgba(224, 254, 16, 1)',
    },
    calories: {
        backgroundColor: 'rgba(255, 94, 177, 1)',
    },
    steps: {
        backgroundColor: 'rgba(126, 81, 255, 1)',
    },
};

const ChartGoalProgress = (): JSX.Element => {
    //  state for data weekly, monthly, yearly

    const [currentData, setCurrentData] = useState<SelectOption>({
        value: 'weekly',
        label: 'Weekly',
    });

    const weeklyData = {
        labels: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        datasets: [
            {
                label: 'Workout',
                data: [20, 30, 40, 50, 60, 70, 80],
                backgroundColor: colors.workout.backgroundColor,

                borderColor: 'transparent',
            },
            {
                label: 'Calories',
                data: [50, 60, 70, 80, 90, 100, 11],
                backgroundColor: colors.calories.backgroundColor,

                borderColor: 'transparent',
            },
            {
                label: 'Steps',
                data: [100, 20, 30, 40, 50, 60, 70],
                backgroundColor: colors.steps.backgroundColor,

                borderColor: 'transparent',
            },
        ],
    };

    const monthlyData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Workout',
                data: [20, 30, 40, 50],
                backgroundColor: colors.workout.backgroundColor,

                borderColor: 'transparent',
            },
            {
                label: 'Calories',
                data: [50, 60, 70, 80],
                backgroundColor: colors.calories.backgroundColor,

                borderColor: 'transparent',
            },
            {
                label: 'Steps',
                data: [100, 20, 30, 40],
                backgroundColor: colors.steps.backgroundColor,

                borderColor: 'transparent',
            },
        ],
    };

    const yearlyData = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        datasets: [
            {
                label: 'Workout',
                data: [20, 30, 40, 50, 60, 70, 80, 90, 100, 70, 50, 55],
                backgroundColor: colors.workout.backgroundColor,
                borderColor: 'transparent',
                margin: 10,
            },
            {
                label: 'Calories',
                data: [50, 60, 70, 80, 90, 100, 100, 20, 30, 40, 50, 16],
                backgroundColor: colors.calories.backgroundColor,

                borderColor: 'transparent',
            },
            {
                label: 'Steps',
                data: [10, 20, 30, 40, 0, 60, 70, 8, 90, 100, 11, 12],
                backgroundColor: colors.steps.backgroundColor,
                borderColor: 'transparent',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 20,
                    // Optional: Include the % sign in the tick labels
                    callback: function (value: number): string {
                        return `${value}%`;
                    },
                },
            },
        },
        barThickness: 'flex',
        borderRadius: 20,
        barPercentage: 0.3,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'start',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    borderRadius: 20,
                    padding: 20,
                    boxWidth: 100,
                },
            },
        },
    };

    const { control, errors } = useAppForm({
        defaultValues: {
            select: currentData.value,
        },
        mode: 'onChange',
    });

    const handleChange = useCallback((newValue: SingleValue<SelectOption>) => {
        if (newValue !== null) {
            setCurrentData(newValue);
        }
    }, []);

    return (
        <div className="bg-secondary relative h-[336px] max-w-[790px] p-8">
            <div className="flex h-10 items-center justify-between">
                <h1 className="text-secondary">Goal Progress</h1>
                <div className="">
                    <Select
                        className="bg-secondary w-[100px] text-xs"
                        control={control}
                        name="select"
                        options={data}
                        errors={errors}
                        value={currentData}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <BarChart
                chartData={
                    currentData.value === 'weekly'
                        ? weeklyData
                        : (currentData.value === 'monthly'
                          ? monthlyData
                          : yearlyData)
                }
                charOptions={options}
            />
        </div>
    );
};

export { ChartGoalProgress };
