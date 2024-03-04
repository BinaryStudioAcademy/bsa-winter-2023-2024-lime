import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { GoalTypes } from '../goal-widget/enums/goal-types.enums.js';
import {
    type CircleSizes,
    CircularProgressColors,
    CircularProgressSizes,
} from './enums/enums.js';

type CircularProgressProperties = {
    value: number;
    target: number;
    size?: CircleSizes;
    goalType?: ValueOf<typeof GoalTypes>;
    color?: ValueOf<typeof CircularProgressColors>;
};

const classes = {
    svgBase:
        'rounded-sm fill-transparent transition-all duration-1000 ease-in-out transform w-[7.5rem]',
    innerTextTop: 'inline-flex font-extrabold text-[2.5rem] font-gilroyBold',
    innerTextBottom: 'inline-flex font-normal text-[1.5rem] font-gilroyLight',
};

const CircleProgress = ({
    value,
    target,
    size = ComponentSize.MEDIUM,
    color = CircularProgressColors.primary,
    goalType = GoalTypes.STANDART,
}: CircularProgressProperties): JSX.Element => {
    const { radius, stroke, fontSize } = CircularProgressSizes[size];
    const { baseCircleClass, progressCircleClass } = color;
    const outerRadius = radius + stroke;
    const circumference = radius * 2 * Math.PI;
    const progressCircleOffset =
        circumference - (value / target) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={outerRadius * 2}
                width={outerRadius * 2}
                style={{ transform: 'rotate(90deg)' }}
            >
                <circle
                    className={getValidClassNames(
                        classes.svgBase,
                        baseCircleClass,
                    )}
                    strokeWidth={stroke}
                    r={radius}
                    cx={radius + stroke}
                    cy={radius + stroke}
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
                    cx={radius + stroke}
                    cy={radius + stroke}
                />
            </svg>
            <div className="absolute text-white">
                {goalType === GoalTypes.OVERVIEW && (
                    <>
                        <p
                            className={getValidClassNames(
                                classes.innerTextTop,
                                fontSize,
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
                            )}
                        >
                            {value}
                        </p>
                    </>
                )}
                {goalType === GoalTypes.RUNNING && (
                    <>
                        <p
                            className={getValidClassNames(
                                classes.innerTextTop,
                                fontSize,
                            )}
                        >
                            {value}
                        </p>
                        <p className="inline-flex font-normal">km</p>
                    </>
                )}
            </div>
        </div>
    );
};

export { CircleProgress };
