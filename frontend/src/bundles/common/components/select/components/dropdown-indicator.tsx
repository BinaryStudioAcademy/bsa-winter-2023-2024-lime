import { type DropdownIndicatorProps, type GroupBase } from 'react-select';
import { components } from 'react-select';

import { Icon } from '~/bundles/common/components/components.js';

import { type SelectOption } from '../types/types.js';

const DropdownIndicator = (
    properties: DropdownIndicatorProps<
        SelectOption,
        boolean,
        GroupBase<SelectOption>
    >,
): JSX.Element => {
    return (
        <components.DropdownIndicator {...properties}>
            <Icon name={'arrowDown'} />
        </components.DropdownIndicator>
    );
};

export { DropdownIndicator };
