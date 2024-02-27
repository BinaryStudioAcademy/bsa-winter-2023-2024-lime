import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { BarChart } from '../components.js';

const ChartGoalProgress = (): JSX.Element => {
    //  state for data weekly, monthly, yearly

    const [currentData, setCurrentData] = useState('weekly'); // weekly, monthly, yearly
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
            x: {
                barPercentage: 10,
                categoryPercentage: 1,
            },
        },
        barThickness: 'flex',
        borderRadius: 20,
        barPercentage: 0.4,
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

    const handleWeekly = useCallback(() => {
        setCurrentData('weekly');
    }, []);

    const handleMonthly = useCallback(() => {
        setCurrentData('monthly');
    }, []);

    const handleYearly = useCallback(() => {
        setCurrentData('yearly');
    }, []);

    return (
        <div className="bg-secondary max-h-[390px] max-w-[790px] p-8">
            <div>
                <button onClick={handleWeekly}>Weekly</button>
                <button onClick={handleMonthly}>Monthly</button>
                <button onClick={handleYearly}>Yearly</button>
            </div>
            <BarChart
                chartData={
                    currentData === 'weekly'
                        ? weeklyData
                        : (currentData === 'monthly'
                          ? monthlyData
                          : yearlyData)
                }
                charOptions={options}
            />
        </div>
    );
};

export { ChartGoalProgress };
