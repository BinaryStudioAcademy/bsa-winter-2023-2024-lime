import { ActivityType } from '~/bundles/goals/enums/enums.js';

const ActivityBackground: Record<string, string> = {
    [ActivityType.WALKING]: 'bg-lm-cyan',
    [ActivityType.RUNNING]: 'bg-lm-blue',
    [ActivityType.CYCLING]: 'bg-lm-magenta',
};

export { ActivityBackground };
