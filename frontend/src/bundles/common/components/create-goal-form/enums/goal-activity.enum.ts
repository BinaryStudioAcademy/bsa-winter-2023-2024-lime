import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { capitalizeString } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { ActivityType } from '~/bundles/goals/enums/enums.js';

const goalActivityToLabel: Record<ValueOf<typeof ActivityType>, string> = {
    [ActivityType.WALKING]: ActivityType.WALKING,
    [ActivityType.RUNNING]: ActivityType.RUNNING,
    [ActivityType.CYCLING]: ActivityType.CYCLING,
};

const goalActivityOptions: SelectOption[] = Object.entries(
    goalActivityToLabel,
).map(([value, label]) => ({
    value,
    label: capitalizeString(label),
}));

export { goalActivityOptions };
