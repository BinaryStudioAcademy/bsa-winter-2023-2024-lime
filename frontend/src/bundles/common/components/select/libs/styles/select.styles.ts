import { type GroupBase, type StylesConfig } from 'react-select';

import { type SelectOption } from '../types/types.js';

const getStyles = <
    isMulti extends boolean = false,
    Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>(): StylesConfig<SelectOption, isMulti, Group> => {
    const defaultStyles: StylesConfig<SelectOption, isMulti, Group> = {
        dropdownIndicator: (styles, state) => ({
            ...styles,
            padding: '0 10px',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
            color: '#383F4A',
            cursor: 'pointer',
            ':hover': {
                color: '#383F4A',
            },
        }),
        control: (base) => ({
            ...base,
            width: '100%',
            height: '45px',
            paddingLeft: '15px',
            display: 'flex',
            alignItems: 'center',
            background: '#2A2F37',
            border: 'none',
            outline: 'none',
            borderRadius: '8px',
            boxShadow: 'none',
            ':hover': {
                cursor: 'pointer',
            },
        }),
        placeholder: (base) => ({
            ...base,
            fontSize: 'inherit',
            color: '#798392',
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
        }),
        option: (base) => ({
            ...base,
            backgroundColor: '#2A2F37',
            color: '#798392',
            ':active': {
                backgroundColor: 'none',
            },
            ':hover': {
                color: '#E0FE10',
                cursor: 'pointer',
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: '#798392',
        }),
        multiValue: (styles) => ({
            ...styles,
            border: '1px solid #B2CA0D',
            borderRadius: '8px',
            backgroundColor: '#2A2F37',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#B2CA0D',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#B2CA0D',
            ':hover': {
                opacity: '0.95',
            },
        }),
        clearIndicator: (base) => ({
            ...base,
            padding: '0',
            color: '#383F4A',
            ':hover': {
                color: '#383F4A',
                opacity: '1.2',
            },
        }),
        menuList: (base) => ({
            ...base,
            background: '#2A2F37',
            maxHeight: '200px',
            '::-webkit-scrollbar': {
                width: '4px',
            },
            '::-webkit-scrollbar-track': {
                background: '#2A2F37',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#B2CA0D',
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
