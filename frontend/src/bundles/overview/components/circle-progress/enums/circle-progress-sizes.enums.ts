import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type CircleSizes = ValueOf<typeof ComponentSize>;

type CircleProperties = {
    radius: number;
    stroke: number;
    fontSize: string;
};

const CircularSizes: Record<CircleSizes, CircleProperties> = {
    [ComponentSize.SMALL]: { radius: 48, stroke: 10, fontSize: 'text-2xl' },
    [ComponentSize.MEDIUM]: { radius: 90, stroke: 15, fontSize: 'text-4xl' },
    [ComponentSize.LARGE]: { radius: 120, stroke: 20, fontSize: 'text-4xl' },
    [ComponentSize.EXTRA_LARGE]: {
        radius: 160,
        stroke: 25,
        fontSize: 'text-4xl',
    },
} as const;

export { type CircleSizes };
export { CircularSizes };
