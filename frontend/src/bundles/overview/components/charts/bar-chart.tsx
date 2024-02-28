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
        <div className="relative flex h-full w-full items-center">
            <Bar
                data={chartData}
                options={charOptions}
                className="h-full w-full"
                height={200}
                width={600}
            />
        </div>
    );
};

export { BarChart };
