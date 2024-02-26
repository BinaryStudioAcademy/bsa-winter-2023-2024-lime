import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type CircularProgressBarProperties = {
    progress: number;
    achievement?: string | undefined;
};

const CircleProgressRadius = {
    LARGE: 59,
    SMALL: 34,
} as const;

const CENTER = 6;

const classes = {
    svgBase: 'fill-transparent w-full h-full rotate-90',
    baseCircle: 'stroke-lm-black-200',
    progressCircle: 'stroke-lm-yellow-100',
    progressText:
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-white font-extrabold',
};

const CircleProgress: React.FC<CircularProgressBarProperties> = ({
    progress,
    achievement,
}): JSX.Element => {
    const radius = achievement
        ? CircleProgressRadius.LARGE
        : CircleProgressRadius.SMALL;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * ((100 - progress) / 100);
    const coordinate = radius + CENTER;

    return (
        <div className="relative h-full w-full">
            <svg
                className={getValidClassNames(
                    classes.svgBase,
                    `${achievement ? 'stroke-[0.5rem]' : 'stroke-[0.375rem]'}`,
                )}
            >
                <circle
                    r={radius}
                    cx={coordinate}
                    cy={coordinate}
                    className={classes.baseCircle}
                ></circle>
                <circle
                    r={radius}
                    cx={coordinate}
                    cy={coordinate}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={classes.progressCircle}
                ></circle>
            </svg>
            <p
                className={getValidClassNames(
                    classes.progressText,
                    `${achievement ? 'md:text-2xl' : 'md:text-[1.5rem]'}`,
                )}
            >
                {achievement ?? progress}
            </p>
        </div>
    );
};

export { CircleProgress };
