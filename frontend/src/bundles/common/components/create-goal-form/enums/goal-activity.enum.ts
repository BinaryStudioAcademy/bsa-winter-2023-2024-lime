import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { capitalizeString } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { Activity } from '~/bundles/goals/enums/enums.js';

const goalActivityToLabel: Record<ValueOf<typeof Activity>, string> = {
    [Activity.WALKING]: Activity.WALKING,
    [Activity.RUNNING]: Activity.RUNNING,
    [Activity.CYCLING]: Activity.CYCLING,
};

const goalActivityOptions: SelectOption[] = Object.entries(
    goalActivityToLabel,
).map(([value, label]) => ({
    value,
    label: capitalizeString(label),
}));

export { goalActivityOptions };
