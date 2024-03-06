import { ActivityType } from '~/bundles/common/enums/enums.js';

const ActivityBackground: Record<string, string> = {
    [ActivityType.WALKING]: 'bg-lm-cyan',
    [ActivityType.RUNNING]: 'bg-lm-light-blue',
    [ActivityType.CYCLING]: 'bg-lm-magenta-200',
};

export { ActivityBackground };
