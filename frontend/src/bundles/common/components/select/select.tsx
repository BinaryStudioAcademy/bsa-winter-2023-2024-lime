import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues
} from 'react-hook-form';
import ReactSelect from 'react-select';

import { useCallback, useFormController } from '~/bundles/common/hooks/hooks.js';

import { type SelectOption, type ValueSelectTypes } from './types/types.js';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    errors: FieldErrors<T>;
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    isMulti?: boolean;
    isDisabled?: boolean;
    isClearable?: boolean
};

const Select = <T extends FieldValues>({
    name,
    control,
    errors,
    options,
    placeholder = '',
    label = '',
    isMulti = false,
    isDisabled = false,
    isClearable = false
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const error = errors[name]?.message as string;

    const handleSelectValue = (
        value: ValueSelectTypes | ValueSelectTypes[]
    ): SelectOption | SelectOption[] | undefined => {
        return (isMulti && value) ?
            options.filter(selectedOption =>
                (value as ValueSelectTypes[]).includes(selectedOption.value))
            : options.find(option => option.value === value);
    };

    const handleChange = useCallback(
        (selectedOptions: unknown): void => {
            const optionsToUpdate = isMulti ?
                (selectedOptions as SelectOption[]).filter(selectedOption =>
                    options.some(option => option.value === selectedOption.value))
                    .map(selectedOption => selectedOption.value)
                : (selectedOptions as SelectOption).value;

            field.onChange(optionsToUpdate);

        },
        [isMulti, field, options]
    );

    return (
        <div className={'select-wrapper'}>
            {label && <span className={'label'}>{label}</span>}
            <ReactSelect
                placeholder={placeholder}
                options={options}
                isMulti={isMulti}
                isDisabled={isDisabled}
                isClearable={isClearable}
                value={handleSelectValue(field.value)}
                onChange={handleChange}
            />
            <span className={'error'}>{error}</span>
        </div>

    );
};

export { Select };
