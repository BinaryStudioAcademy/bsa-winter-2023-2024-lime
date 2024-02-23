import { Activity } from '~/bundles/goals/enums/enums.js';

type ActivityType = {
    label: string;
    value: string;
};

const capitalize = (string_: string): string => {
    return string_.charAt(0).toUpperCase() + string_.slice(1);
};

const goalActivity: ActivityType[] = [
    { label: capitalize(Activity.CYCLING), value: Activity.CYCLING },
    { label: capitalize(Activity.RUNNING), value: Activity.RUNNING },
    { label: capitalize(Activity.WALKING), value: Activity.WALKING },
];

export { goalActivity };
