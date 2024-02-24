import { Activity } from '~/bundles/goals/enums/enums.js';

const ActivityBackground: Record<string, string> = {
    [Activity.WALKING]: 'bg-lm-cyan',
    [Activity.RUNNING]: 'bg-lm-blue',
    [Activity.CYCLING]: 'bg-lm-magenta',
};

export { ActivityBackground };
