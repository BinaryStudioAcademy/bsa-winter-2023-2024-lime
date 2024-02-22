import { Activity } from '~/bundles/goals/enums/enums.js';

const ActivityBackground: Record<string, string> = {
    [Activity.WALKING]: 'bg-[#05CFCF]',
    [Activity.RUNNING]: 'bg-[#056ECF]',
    [Activity.CYCLING]: 'bg-[#DC40CD]',
};

export { ActivityBackground };
