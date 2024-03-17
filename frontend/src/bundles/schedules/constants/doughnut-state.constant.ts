const DOUGHNUT_DATASET = {
    backgroundColor: ['rgb(28, 34, 39)', 'rgb(224 254 16)'],
    borderColor: ['transparent', 'transparent'],
} as const;

const DOUGHNUT_OPTIONS = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '50%',
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
} as const;

export { DOUGHNUT_DATASET, DOUGHNUT_OPTIONS };
