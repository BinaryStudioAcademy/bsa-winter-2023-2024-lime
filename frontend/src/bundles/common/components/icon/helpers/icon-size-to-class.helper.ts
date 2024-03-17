import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

const sizeToClass: Record<ValueOf<typeof ComponentSize>, string> = {
    [ComponentSize.SMALL]: 'h-5 w-5',
    [ComponentSize.MEDIUM]: 'h-6 w-6',
    [ComponentSize.LARGE]: 'h-8 w-8',
    [ComponentSize.EXTRA_LARGE]: 'h-40 w-40',
    [ComponentSize.HUGE]: 'h-176 w-176',
};

export { sizeToClass };
