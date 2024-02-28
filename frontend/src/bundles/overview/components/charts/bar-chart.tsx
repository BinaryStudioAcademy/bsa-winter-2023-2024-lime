import 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

import { optionsBarChart } from '../chart-goal-progress/config/bar-chart-config.config.js';
import { type BarChartData, type BarChartOptions } from './types/types.js';

type BarChartProperties = {
    chartData: BarChartData;
    chartOptions?: BarChartOptions;
};

const BarChart = ({
    chartData,
    chartOptions = optionsBarChart,
}: BarChartProperties): JSX.Element => {
    return (
        <div className="relative flex h-full w-full items-center">
            <Bar
                data={chartData}
                options={chartOptions}
                className="h-full w-full"
                height={200}
                width={600}
            />
        </div>
    );
};

export { BarChart };
