const optionsBarChart = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                min: 0,
                max: 100,
                stepSize: 20,
                callback: (value: number): string => `${value}%`,
            },
        },
    },
    barThickness: 'flex',
    borderRadius: 20,
    barPercentage: 0.3,
    responsive: true,
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

export { optionsBarChart };
