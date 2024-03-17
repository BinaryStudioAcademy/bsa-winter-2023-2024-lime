import 'chart.js/auto';

import { type ChartData, type ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

type Properties = {
    data: ChartData<'doughnut'>;
    options: ChartOptions<'doughnut'>;
    className?: string;
};
const DoughnutChart: React.FC<Properties> = ({
    options,
    data,
    className,
}): JSX.Element => {
    return (
        <div>
            <Doughnut className={className} data={data} options={options} />
        </div>
    );
};

export { DoughnutChart };
