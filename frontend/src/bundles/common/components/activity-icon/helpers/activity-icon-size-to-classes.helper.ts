import { type ActivityIconSize } from '~/bundles/common/components/activity-icon/types/types.js';
import { ComponentSize } from '~/bundles/common/enums/component-size.enum.js';

const activityIconSizeToClasses: Record<ActivityIconSize, string> = {
    [ComponentSize.SMALL]: 'h-9 w-9 rounded-full',
    [ComponentSize.MEDIUM]: 'h-11 w-11 rounded',
    [ComponentSize.LARGE]: 'h-12 w-12 rounded-full',
};

export { activityIconSizeToClasses };
