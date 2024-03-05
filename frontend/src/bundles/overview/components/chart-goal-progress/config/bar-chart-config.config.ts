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
            grid: {
                display: true,
                drawBorder: false,
                color: '#383F4A',
            },
        },
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
        },
    },
    barThickness: 'flex',
    borderRadius: 20,
    barPercentage: 0.2,
    responsive: true,
    maintainAspectRatio: false,
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
