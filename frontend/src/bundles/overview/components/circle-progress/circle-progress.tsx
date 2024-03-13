import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import {
    convertMetersToKilometers,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { DOUBLE_VALUE } from '~/bundles/overview/components/circle-progress/constants/constants.js';
import {
    type CircleSizes,
    CircularProgressColors,
    CircularProgressSizes,
} from '~/bundles/overview/components/circle-progress/enums/enums.js';
import { CircleSizeToFontParameters } from '~/bundles/overview/components/circle-progress/helpers/helpers.js';
import { GoalTypes } from '~/bundles/overview/components/goal-widget/enums/enums.js';

type CircularProgressProperties = {
    value: number;
    target: number;
    size?: CircleSizes;
    goalType?: ValueOf<typeof GoalTypes>;
    color?: ValueOf<typeof CircularProgressColors>;
    hasDistance?: boolean;
};

const classes = {
    svgBase:
        'rounded-sm fill-transparent transition-all duration-1000 ease-in-out transform w-[7.5rem]',
    innerTextTop: 'inline-flex font-extrabold font-extrabold',
    innerTextBottom:
        'inline-flex font-normal text-[1.5rem] font-accent font-light',
};

const CircleProgress = ({
    value,
    target,
    size = ComponentSize.MEDIUM,
    color = CircularProgressColors.primary,
    goalType = GoalTypes.STANDART,
    hasDistance = false,
}: CircularProgressProperties): JSX.Element => {
    const { radius, stroke } = CircularProgressSizes[size];
    const { fontSize, fontFamily, fontColor } =
        CircleSizeToFontParameters[size];
    const { baseCircleClass, progressCircleClass } = color;
    const outerRadius = radius + stroke;
    const circumference = radius * DOUBLE_VALUE * Math.PI;
    const progressCircleOffset =
        circumference - (value / target) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={outerRadius * DOUBLE_VALUE}
                width={outerRadius * DOUBLE_VALUE}
                style={{ transform: 'rotate(90deg)' }}
            >
                <circle
                    className={getValidClassNames(
                        classes.svgBase,
                        baseCircleClass,
                    )}
                    strokeWidth={stroke}
                    r={radius}
                    cx={outerRadius}
                    cy={outerRadius}
                />
                <circle
                    className={getValidClassNames(
                        classes.svgBase,
                        progressCircleClass,
                    )}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset: progressCircleOffset }}
                    strokeLinecap="round"
                    r={radius}
                    cx={outerRadius}
                    cy={outerRadius}
                />
            </svg>
            <div className="absolute flex items-baseline gap-1 text-white">
                {goalType === GoalTypes.OVERVIEW && (
                    <>
                        <p
                            className={getValidClassNames(
                                classes.innerTextTop,
                                fontSize,
                                fontFamily,
                                fontColor,
                            )}
                        >
                            {value}
                        </p>
                        <p className={classes.innerTextBottom}>/{target}</p>
                    </>
                )}
                {goalType === GoalTypes.STANDART && (
                    <>
                        <p
                            className={getValidClassNames(
                                classes.innerTextTop,
                                fontSize,
                                fontFamily,
                                fontColor,
                            )}
                        >
                            {value}
                        </p>
                    </>
                )}
                {(goalType === GoalTypes.RUNNING ||
                    goalType === GoalTypes.CYCLING ||
                    goalType === GoalTypes.WALKING) && (
                    <>
                        <p
                            className={getValidClassNames(
                                classes.innerTextTop,
                                fontSize,
                                fontFamily,
                                fontColor,
                            )}
                        >
                            {hasDistance
                                ? convertMetersToKilometers(value)
                                : value}
                        </p>
                        <p className="inline-flex font-normal">
                            {hasDistance ? 'km' : 'min'}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export { CircleProgress };
