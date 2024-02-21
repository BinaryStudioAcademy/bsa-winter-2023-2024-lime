import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    type CircleSizes,
    CircularProgressSizes,
} from '~/bundles/overview/enums/enums.js';
import { CircularProgressColors } from '~/bundles/overview/enums/enums.js';

type CircularProgressProperties = {
    value: number;
    target: number;
    size?: CircleSizes;
    color?: ValueOf<typeof CircularProgressColors>;
};

const BaseClass =
    'rounded-sm fill-transparent transition-all duration-1000 ease-in-out transform';

const CircularProgress = ({
    value,
    target,
    size = ComponentSize.MEDIUM,
    color = CircularProgressColors.primary,
}: CircularProgressProperties): JSX.Element => {
    const { radius, stroke } = CircularProgressSizes[size];
    const { baseCircleClass, progressCircleClass } = color;
    const innerRadius = radius - stroke * 2;
    const circumference = innerRadius * 2 * Math.PI;
    const progressCircleOffset =
        circumference - (value / target) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                className={getValidClassNames(BaseClass, baseCircleClass)}
                strokeWidth={stroke}
                r={innerRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                className={getValidClassNames(BaseClass, progressCircleClass)}
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset: progressCircleOffset }}
                strokeLinecap="round"
                r={innerRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

export { CircularProgress };
