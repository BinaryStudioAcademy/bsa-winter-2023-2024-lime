import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type CircleSizes } from '~/bundles/overview/components/circle-progress/enums/enums.js';

type FontProperties = {
    fontSize: string;
    fontFamily: string;
    fontColor: string;
};

const CircleSizeToFontParameters: Record<CircleSizes, FontProperties> = {
    [ComponentSize.SMALL]: {
        fontSize: 'text-[1.5rem]',
        fontFamily: 'font-sans',
        fontColor: 'text-primary',
    },
    [ComponentSize.MEDIUM]: {
        fontSize: 'text-[2.5rem]',
        fontFamily: 'font-accent',
        fontColor: 'text-white',
    },
    [ComponentSize.LARGE]: {
        fontSize: 'text-4xl',
        fontFamily: 'font-sans',
        fontColor: 'text-white',
    },
    [ComponentSize.EXTRA_LARGE]: {
        fontSize: 'text-4xl',
        fontFamily: 'font-accent',
        fontColor: 'text-primary',
    },
};

export { CircleSizeToFontParameters };
