import { goalActivityToLabel } from '~/bundles/common/components/create-goal-form/helpers/helpers.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';

const setGoalActivityOptions: SelectOption[] = Object.entries(
    goalActivityToLabel,
).map(([value, label]) => ({
    value,
    label: capitalizeFirstLetter(label),
}));

export { setGoalActivityOptions };
