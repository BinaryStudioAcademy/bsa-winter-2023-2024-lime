// components/BarChart.js
import 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

type BarChartProperties = {
    chartData: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
            borderColor: string;
        }[];
    };
    charOptions: {
        scales: {
            y: {
                beginAtZero: boolean;
            };
        };
    };
};

const BarChart = ({
    chartData,
    charOptions,
}: BarChartProperties): JSX.Element => {
    return (
        <div className="h-full w-4/5">
            <Bar data={chartData} options={charOptions} />
        </div>
    );
};

export { BarChart };
