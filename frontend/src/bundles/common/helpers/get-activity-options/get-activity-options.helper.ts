
import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { ActivityLabels } from '~/bundles/common/enums/enums.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';

const getActivityOptions: SelectOption[] = Object.entries(
    ActivityLabels,
).map(([value, label]) => ({
    value,
    label: capitalizeFirstLetter(label),
}));

export { getActivityOptions };
