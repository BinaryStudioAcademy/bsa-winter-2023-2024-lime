import { type GroupBase, type StylesConfig } from 'react-select';

import { Color } from '../enum/color.enum.js';
import { type SelectOption } from '../types/types.js';

const getStyles = <
    isMulti extends boolean = false,
    Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>(
    errorMessage: string,
): StylesConfig<SelectOption, isMulti, Group> => {
    const baseColor = errorMessage ? Color.RED : Color.YELLOW[100];

    const defaultStyles: StylesConfig<SelectOption, isMulti, Group> = {
        control: (base, state) => ({
            ...base,
            width: '100%',
            margin: '8px 0',
            minHeight: '45px',
            paddingLeft: '10px',
            background: Color.BLACK[100],
            border: state.isFocused ? `1px solid ${baseColor}` : 'none',
            outline: 'none',
            borderRadius: '8px',
            fontSize: 'inherit',
            boxShadow: 'none',
            ':hover': {
                cursor: 'pointer',
                border: `1px solid ${baseColor}`,
            },
        }),
        dropdownIndicator: (styles, state) => ({
            ...styles,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
            color: Color.GRAY[500],
            cursor: 'pointer',
            ':hover': {
                color: Color.GRAY[500],
            },
        }),

        placeholder: (base) => ({
            ...base,
            fontSize: 'inherit',
            color: Color.GRAY[200],
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0',
            margin: '0',
        }),
        input: (styles) => ({
            ...styles,
            padding: '0',
            margin: '0',
            color: Color.WHITE,
        }),
        option: (base) => ({
            ...base,
            backgroundColor: Color.BLACK[100],
            color: Color.GRAY[200],
            ':active': {
                backgroundColor: 'none',
            },
            ':hover': {
                color: baseColor,
                cursor: 'pointer',
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: Color.GRAY[200],
        }),
        multiValue: (styles) => ({
            ...styles,
            borderRadius: '8px',
            backgroundColor: Color.GRAY[500],
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: baseColor,
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: baseColor,
            ':hover': {
                opacity: '0.95',
            },
        }),
        clearIndicator: (base) => ({
            ...base,
            padding: '0',
            color: Color.GRAY[500],
            ':hover': {
                color: Color.GRAY[500],
                opacity: '1.2',
            },
        }),
        menuList: (base) => ({
            ...base,
            background: Color.BLACK[100],
            maxHeight: '200px',
            '::-webkit-scrollbar': {
                width: '4px',
            },
            '::-webkit-scrollbar-track': {
                background: Color.BLACK[100],
            },
            '::-webkit-scrollbar-thumb': {
                background: Color.YELLOW[200],
                borderRadius: '8px',
            },
        }),
        indicatorSeparator: (base) => ({
            ...base,
            display: 'none',
        }),
    };

    return defaultStyles;
};

export { getStyles };
