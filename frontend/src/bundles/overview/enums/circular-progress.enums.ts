import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type CircularColor = ValueOf<typeof CircularColorEnum>;
type CircleSizes = ValueOf<typeof ComponentSize>;

type CircleProperties = {
    radius: number;
    stroke: number;
};

const CircularColorEnum = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DEFAULT: 'default',
} as const;

const CircularSizes: Record<CircleSizes, CircleProperties> = {
    [ComponentSize.SMALL]: { radius: 48, stroke: 10 },
    [ComponentSize.MEDIUM]: { radius: 80, stroke: 15 },
    [ComponentSize.LARGE]: { radius: 120, stroke: 20 },
    [ComponentSize.EXTRA_LARGE]: { radius: 160, stroke: 25 },
} as const;

const CircularColors: Record<
    CircularColor,
    { baseCircleClass: string; progressCircleClass: string }
> = {
    [CircularColorEnum.PRIMARY]: {
        baseCircleClass: 'stroke-lm-black-100',
        progressCircleClass: 'stroke-lm-yellow-100',
    },
    [CircularColorEnum.SECONDARY]: {
        baseCircleClass: 'stroke-lm-black-200',
        progressCircleClass: 'stroke-lm-yellow-200',
    },
    [CircularColorEnum.DEFAULT]: {
        baseCircleClass: 'stroke-lm-black-300',
        progressCircleClass: 'stroke-lm-yellow-100',
    },
} as const;

export { type CircleSizes };
export { CircularColors, CircularSizes };
