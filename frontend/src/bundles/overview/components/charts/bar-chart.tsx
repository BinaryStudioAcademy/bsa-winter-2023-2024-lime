import 'chart.js/auto';

import { optionsBarChart } from '../chart-goal-progress/config/config.js';
import { Bar } from './components/components.js';
import css from './styles/bar-chart.module.css';
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
        <div className={css['chart-oferflow-container']}>
            <div className="relative flex h-full w-[53rem] items-center xl:w-auto xl:max-w-[calc((100vw-26rem)*0.68-2rem)]">
                <Bar
                    data={chartData}
                    options={chartOptions}
                    className="h-full w-full"
                    height={200}
                    width={600}
                    color="#000"
                />
            </div>
        </div>
    );
};

export { BarChart };
