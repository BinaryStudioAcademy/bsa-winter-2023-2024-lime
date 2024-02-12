import { type DropdownIndicatorProps, type GroupBase } from 'react-select';
import { components } from 'react-select';

import arrowDown from '~/assets/img/icons/arrow-down-icon.svg';

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
            <img src={arrowDown} alt="arrow-down" />
        </components.DropdownIndicator>
    );
};

export { DropdownIndicator };
