const optionsBarChart = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                color: '#798392',
                min: 0,
                max: 100,
                stepSize: 20,
                callback: (value: number): string => `${value}%`,
            },
            grid: {
                display: true,
                drawBorder: false,
            },
            border: {
                display: false,
            },
        },
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                color: '#798392',
            },
        },
    },
    color: '#798392',
    barThickness: 'flex',
    borderRadius: 20,
    barPercentage: 0.4,
    categoryPercentage: 0.4,
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
