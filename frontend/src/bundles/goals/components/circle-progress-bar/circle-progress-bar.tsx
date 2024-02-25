type CircularProgressBarProperties = {
    progress: number;
};

const classes = {
    svgBase: 'fill-transparent w-full h-full stroke-[0.375rem] rotate-90',
    baseCircle: 'stroke-lm-black-200',
    progressCircle: 'stroke-lm-yellow-100',
    progressText:
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base md:text-2xl font-extrabold',
};

const CircleProgress: React.FC<CircularProgressBarProperties> = ({
    progress,
}): JSX.Element => {
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * ((100 - progress) / 100);

    return (
        <div className="relative h-16 w-16 md:h-20 md:w-20">
            <svg viewBox="0 0 80 80" className={classes.svgBase}>
                <circle
                    r={radius}
                    cx="40"
                    cy="40"
                    className={classes.baseCircle}
                ></circle>
                <circle
                    r={radius}
                    cx="40"
                    cy="40"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={classes.progressCircle}
                ></circle>
            </svg>
            <p className={classes.progressText}>{progress}</p>
        </div>
    );
};

export { CircleProgress };
