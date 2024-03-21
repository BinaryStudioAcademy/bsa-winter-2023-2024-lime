type BarChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
    }[];
};

export { type BarChartData };
