type BarChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
    }[];
};

type BarChartOptions = {
    scales: {
        y: {
            beginAtZero: boolean;
        };
    };
};

export { type BarChartData, type BarChartOptions };
