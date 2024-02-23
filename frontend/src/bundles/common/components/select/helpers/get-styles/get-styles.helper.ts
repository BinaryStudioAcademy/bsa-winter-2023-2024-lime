import { type ClassNamesConfig, type GroupBase } from 'react-select';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { type SelectOption } from '../../types/types.js';

const getStyles = <
    isMulti extends boolean = false,
    Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>(
    errorMessage: string,
): ClassNamesConfig<SelectOption, isMulti, Group> => {
    const textColor = errorMessage ? 'text-lm-red' : 'text-lm-yellow-100';
    const borderColor = errorMessage ? 'border-lm-red' : 'border-lm-yellow-100';

    const defaultStyles: ClassNamesConfig<SelectOption, isMulti, Group> = {
        control: (state) =>
            getValidClassNames(
                state.isFocused ? `${borderColor}` : 'border-0',
                `w-full p-2.5 h-9 bg-lm-black-100 border
                outline-none rounded-md text-inherit shadow-none hover:cursor-pointer`,
            ),
        dropdownIndicator: (state) => {
            const transform = state.selectProps.menuIsOpen ? 'rotate-180' : '';
            return `${transform} text-gray-500 cursor-pointer hover:text-grey-500 mr-2`;
        },

        placeholder: () => 'font-inherit text-lm-grey-200',
        valueContainer: () => 'm-0 p-0',
        input: () => 'm-0 p-0 text-white',
        option: () =>
            getValidClassNames(
                errorMessage ? 'hover:text-lm-red' : 'hover:text-lm-yellow-100',
                'bg-lm-black-100 text-lm-grey-200 bg-none hover:bg-transparent hover:cursor-pointer p-4',
            ),
        singleValue: () => 'text-lm-grey-200',
        multiValue: () =>
            'bg-lm-grey-500 rounded-lg items-center py-1 pl-2 pr-1 ml-1 gap-2 ',
        multiValueLabel: () => `${textColor} `,
        multiValueRemove: () => `${textColor} hover:opacity-9`,
        clearIndicator: () => 'p-0 text-lm-grey-500 mr-4 hover:opacity-9',
        menuList: () =>
            'max-h-200 overflow-auto custom-scrollbar bg-lm-black-200',
        noOptionsMessage: () => 'text-lm-grey-200 p-4',
        menu: () => 'mt-1',
    };

    return defaultStyles;
};

export { getStyles };
