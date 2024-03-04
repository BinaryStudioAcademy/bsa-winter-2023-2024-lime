import { colorsBarChartProgress as colors } from '~/bundles/overview/components/chart-goal-progress/enums/enums.js';

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
            backgroundColor: colors.WORKOUT.backgroundColor,

            borderColor: 'transparent',
        },
        {
            label: 'Calories',
            data: [50, 60, 70, 80, 90, 100, 11],
            backgroundColor: colors.CALORIES.backgroundColor,

            borderColor: 'transparent',
        },
        {
            label: 'Steps',
            data: [100, 20, 30, 40, 50, 60, 70],
            backgroundColor: colors.STEPS.backgroundColor,

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
            backgroundColor: colors.WORKOUT.backgroundColor,

            borderColor: 'transparent',
        },
        {
            label: 'Calories',
            data: [50, 60, 70, 80],
            backgroundColor: colors.CALORIES.backgroundColor,

            borderColor: 'transparent',
        },
        {
            label: 'Steps',
            data: [100, 20, 30, 40],
            backgroundColor: colors.STEPS.backgroundColor,

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
            backgroundColor: colors.WORKOUT.backgroundColor,
            borderColor: 'transparent',
            margin: 10,
        },
        {
            label: 'Calories',
            data: [50, 60, 70, 80, 90, 100, 100, 20, 30, 40, 50, 16],
            backgroundColor: colors.CALORIES.backgroundColor,

            borderColor: 'transparent',
        },
        {
            label: 'Steps',
            data: [10, 20, 30, 40, 0, 60, 70, 8, 90, 100, 11, 12],
            backgroundColor: colors.STEPS.backgroundColor,
            borderColor: 'transparent',
        },
    ],
};

export { monthlyData, weeklyData, yearlyData };
