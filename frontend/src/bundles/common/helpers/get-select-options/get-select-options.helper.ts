import { type SelectOption } from '~/bundles/common/components/select/types/types.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';

const getSelectOptions = (object: Record<string, string>): SelectOption[] =>
    Object.values(object).map((value) => ({
        value,
        label: capitalizeFirstLetter(value),
    }));

export { getSelectOptions };
