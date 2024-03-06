import { type ValueOf } from '~/bundles/common/types/types.js';

const CircularColorEnum = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DEFAULT: 'default',
} as const;

type CircularColor = ValueOf<typeof CircularColorEnum>;

const CircularColors: Record<
    CircularColor,
    { baseCircleClass: string; progressCircleClass: string }
> = {
    [CircularColorEnum.PRIMARY]: {
        baseCircleClass: 'stroke-primary',
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

export { CircularColors };
