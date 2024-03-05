import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type CircleSizes } from '~/bundles/overview/components/circle-progress/enums/enums.js';

type FontProperties = {
    fontSize: string;
    fontFamily: string;
};

const CircleSizeToFontParameters: Record<CircleSizes, FontProperties> = {
    [ComponentSize.SMALL]: {
        fontSize: 'text-[1.5rem]',
        fontFamily: 'font-sans',
    },
    [ComponentSize.MEDIUM]: {
        fontSize: 'text-[2.5rem]',
        fontFamily: 'font-accent',
    },
    [ComponentSize.LARGE]: {
        fontSize: 'text-4xl',
        fontFamily: 'font-sans',
    },
    [ComponentSize.EXTRA_LARGE]: {
        fontSize: 'text-4xl',
        fontFamily: 'font-accent',
    },
};

export { CircleSizeToFontParameters };
