import { capitalizeString } from '~/bundles/common/helpers/helpers.js';
import { Activity } from '~/bundles/goals/enums/enums.js';

type ActivityType = {
    label: string;
    value: string;
};

const goalActivity: ActivityType[] = [
    { label: capitalizeString(Activity.CYCLING), value: Activity.CYCLING },
    { label: capitalizeString(Activity.RUNNING), value: Activity.RUNNING },
    { label: capitalizeString(Activity.WALKING), value: Activity.WALKING },
];

export { goalActivity };
