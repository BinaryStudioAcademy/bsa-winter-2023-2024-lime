import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type CircleSizes = Exclude<
    ValueOf<typeof ComponentSize>,
    typeof ComponentSize.HUGE
>;

type CircleProperties = {
    radius: number;
    stroke: number;
};

const CircularSizes: Record<CircleSizes, CircleProperties> = {
    [ComponentSize.SMALL]: { radius: 34, stroke: 5 },
    [ComponentSize.MEDIUM]: { radius: 60, stroke: 8 },
    [ComponentSize.LARGE]: { radius: 120, stroke: 20 },
    [ComponentSize.EXTRA_LARGE]: { radius: 160, stroke: 25 },
} as const;

export { type CircleSizes };
export { CircularSizes };
