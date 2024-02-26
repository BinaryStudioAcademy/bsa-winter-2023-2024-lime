import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { capitalizeString } from '~/bundles/common/helpers/helpers.js';
import { Activity } from '~/bundles/goals/enums/enums.js';

const goalActivity: SelectOption[] = [
    { label: capitalizeString(Activity.CYCLING), value: Activity.CYCLING },
    { label: capitalizeString(Activity.RUNNING), value: Activity.RUNNING },
    { label: capitalizeString(Activity.WALKING), value: Activity.WALKING },
];

export { goalActivity };
