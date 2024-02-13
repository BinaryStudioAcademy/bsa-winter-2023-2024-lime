import { type DropdownIndicatorProps, type GroupBase } from 'react-select';
import { components } from 'react-select';

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
            <svg
                className={'w-3 h-1.5'}
                viewBox="0 0 12 6"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.29295 5.70698L0.853647 1.26769C0.538648 0.95269 0.761747 0.414091 1.20715 0.414091L10.7929 0.414091C11.2384 0.414091 11.4615 0.95269 11.1465 1.26769L6.70715 5.70698C6.31665 6.09751 5.68345 6.09751 5.29295 5.70698Z"
                    fill="#383F4A"
                />
            </svg>
        </components.DropdownIndicator>
    );
};

export { DropdownIndicator };
