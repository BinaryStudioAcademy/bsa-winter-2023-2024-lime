import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type CircleSizes = ValueOf<typeof ComponentSize>;

type CircleProperties = {
    radius: number;
    stroke: number;
    fontSize: string;
    fontFamily: string;
};

const ComponentSizeToCircularParameter: Record<CircleSizes, CircleProperties> = {
    [ComponentSize.SMALL]: {
        radius: 34,
        stroke: 5,
        fontSize: 'text-[1.5rem]',
        fontFamily: 'font-sans',
    },
    [ComponentSize.MEDIUM]: {
        radius: 60,
        stroke: 8,
        fontSize: 'text-[2.5rem]',
        fontFamily: 'font-accent',
    },
    [ComponentSize.LARGE]: {
        radius: 120,
        stroke: 20,
        fontSize: 'text-4xl',
        fontFamily: 'font-sans',
    },
    [ComponentSize.EXTRA_LARGE]: {
        radius: 160,
        stroke: 25,
        fontSize: 'text-4xl',
        fontFamily: 'font-accent',
    },
} as const;

export { type CircleSizes };
export { ComponentSizeToCircularParameter };
