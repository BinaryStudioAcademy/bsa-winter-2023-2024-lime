import { type ValueOf } from '~/bundles/common/types/types.js';
import { ColorsBarChartProgress as colors } from '~/bundles/overview/components/chart-goal-progress/enums/enums.js';
import { type WorkoutResponseDto } from '~/bundles/workouts/types/types.js';

import { type BarChartData } from '../components/bar-chart/types/bar-chart-data.types.js';
import { ChartType } from '../enums/enums.js';
import { convertStatsToPercentage } from './convert-stats-to-percentage.helper.js';
import { generateMonthlyDatasets } from './generate-monthly-datasets.helper.js';
import { generateWeeklyDatasets } from './generate-weekly-datasets.helper.js';
import { generateYearlyDatasets } from './generate-yearly-datasets.helper.js';

const generateChartStats = (
    type: ValueOf<typeof ChartType>,
    workouts: WorkoutResponseDto[],
): BarChartData => {
    const chartData: BarChartData = {
        labels: [],
        datasets: [
            {
                label: 'Workout',
                data: [],
                backgroundColor: colors.WORKOUT.backgroundColor,
                borderColor: 'transparent',
            },
            {
                label: 'Calories',
                data: [],
                backgroundColor: colors.CALORIES.backgroundColor,
                borderColor: 'transparent',
            },
            {
                label: 'Steps',
                data: [],
                backgroundColor: colors.STEPS.backgroundColor,
                borderColor: 'transparent',
            },
        ],
    };

    const today = new Date();
    const datasets = [];

    switch (type) {
        case ChartType.WEEKLY: {
            const result = generateWeeklyDatasets(today, workouts);
            chartData.labels = result.labels;
            datasets.push(...result.datasets);
            break;
        }
        case ChartType.MONTHLY: {
            const result = generateMonthlyDatasets(today, workouts);
            chartData.labels = result.labels;
            datasets.push(...result.datasets);

            break;
        }
        case ChartType.YEARLY: {
            const result = generateYearlyDatasets(today, workouts);
            chartData.labels = result.labels;
            datasets.push(...result.datasets);

            break;
        }
    }

    const datasetsInPercentage = convertStatsToPercentage(datasets);

    for (const data of datasetsInPercentage) {
        chartData.datasets[0]?.data.push(data.workouts);
        chartData.datasets[1]?.data.push(data.kilocalories);
        chartData.datasets[2]?.data.push(data.steps);
    }

    return chartData;
};

export { generateChartStats };
