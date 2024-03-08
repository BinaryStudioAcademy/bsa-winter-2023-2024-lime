import { goalFrequencyToLabel } from '~/bundles/common/components/create-goal-form/helpers/helpers.js';
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';

const setGoalFrequencyOpitons: SelectOption[] = Object.entries(
    goalFrequencyToLabel,
).map(([value, label]) => ({
    value,
    label,
}));

export { setGoalFrequencyOpitons };
