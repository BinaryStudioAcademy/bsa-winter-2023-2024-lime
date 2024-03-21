import 'chart.js/auto';

import { Bar } from './components/components.js';
import { optionsBarChart } from './config/config.js';
import css from './styles/bar-chart.module.css';
import { type BarChartData, type BarChartOptions } from './types/types.js';

type Properties = {
    chartData: BarChartData;
    chartOptions?: BarChartOptions;
};

const BarChart: React.FC<Properties> = ({
    chartData,
    chartOptions = optionsBarChart,
}): JSX.Element => {
    return (
        <div className={css['chart-overflow-container']}>
            {chartData.datasets.some((dataset) => dataset.data.length === 0) ? (
                <h3 className="text-secondary inline-flex h-[14.25rem] w-full items-center justify-center">
                    No workouts found for this period
                </h3>
            ) : (
                <div className="relative flex h-full w-[53rem] items-center xl:w-auto xl:max-w-[calc((100vw-26rem)*0.68-2rem)]">
                    <Bar
                        data={chartData}
                        options={chartOptions}
                        className="h-full w-full"
                        height={200}
                        width={600}
                    />
                </div>
            )}
        </div>
    );
};

export { BarChart };
