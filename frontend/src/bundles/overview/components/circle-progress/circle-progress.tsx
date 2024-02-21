import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    type CircleSizes,
    CircularProgressColors,
    CircularProgressSizes,
} from '~/bundles/overview/enums/enums.js';

import { GoalTypes } from '../goal-widget/enums/goal-types.enums.js';

type CircularProgressProperties = {
    done: number;
    toDo: number;
    size?: CircleSizes;
    goalType?: ValueOf<typeof GoalTypes>;
    color?: ValueOf<typeof CircularProgressColors>;
    children?: React.ReactNode;
};

const classes = {
    svgBase:
        'rounded-sm fill-transparent transition-all duration-1000 ease-in-out transform',
    innerTextTop: 'inline-flex font-extrabold',
    innerTextBottom: 'inline-flex font-normal',
};
('rounded-sm fill-transparent transition-all duration-1000 ease-in-out transform');

const CircleProgress = ({
    done,
    toDo,
    size = ComponentSize.MEDIUM,
    color = CircularProgressColors.primary,
    goalType = GoalTypes.STANDART,
}: CircularProgressProperties): JSX.Element => {
    const { radius, stroke, fontSize } = CircularProgressSizes[size];
    const { baseCircleClass, progressCircleClass } = color;
    const innerRadius = radius - stroke * 2;
    const circumference = innerRadius * 2 * Math.PI;
    const progressCircleOffset =
        circumference - (done / toDo) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                style={{ transform: 'rotate(90deg)' }}
            >
                <circle
                    className={getValidClassNames(
                        classes.svgBase,
                        baseCircleClass,
                    )}
                    strokeWidth={stroke}
                    r={innerRadius}
                    cx={radius}
                    cy={radius}
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
                    r={innerRadius}
                    cx={radius}
                    cy={radius}
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
                            {done}
                        </p>
                        <p className="inline-flex font-normal">/{toDo}</p>
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
                            {done}
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
                            {done}
                        </p>
                        <p className="inline-flex font-normal">km</p>
                    </>
                )}
            </div>
        </div>
    );
};

export { CircleProgress };
