import { ActivityType } from '~/bundles/goals/enums/enums.js';

const activityIconBackground: Record<string, string> = {
    [ActivityType.WALKING]: 'bg-lm-cyan',
    [ActivityType.RUNNING]: 'bg-lm-light-blue',
    [ActivityType.CYCLING]: 'bg-lm-magenta-200',
};

export { activityIconBackground };
