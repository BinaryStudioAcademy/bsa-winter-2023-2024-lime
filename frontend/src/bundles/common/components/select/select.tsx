import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type GroupBase, type OnChangeValue, type Props } from 'react-select';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { DropdownIndicator } from './components/dropdown-indicator.js';
import { getStyles } from './styles/styles.js';
import { type SelectOption, type SelectValue } from './types/types.js';

type Properties<
    T extends FieldValues,
    IsMulti extends boolean = false,
    Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
> = Props<SelectOption, IsMulti, Group> & {
    name: FieldPath<T>;
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
};

const animatedComponents = makeAnimated();

const Select = <
    T extends FieldValues,
    IsMulti extends boolean = false,
    Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
    name,
    control,
    errors,
    options,
    label = '',
    placeholder = 'Select something...',
    isMulti,
    isDisabled = false,
    isClearable = false,
    isSearchable = false,
    ...rest
}: Properties<T, IsMulti, Group>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const error = errors[name]?.message as string;

    const handleSelectValue = (
        value: SelectValue | SelectValue[],
    ): SelectOption | SelectOption[] | undefined => {
        if (isMulti && value) {
            return (options as SelectOption[]).filter((option) =>
                (value as SelectValue[]).includes(option.value),
            );
        } else if (!isMulti && value) {
            return (options as SelectOption[]).find(
                (option) => option.value === value,
            );
        }
    };

    const handleChange = useCallback(
        (
            selectedOptions: OnChangeValue<
                SelectOption | SelectOption[],
                boolean
            >,
        ): void => {
            if (isMulti) {
                const optionsToUpdate = (selectedOptions as SelectOption[])
                    .filter((selectedOption) =>
                        (options as SelectOption[]).some(
                            (option) => option.value === selectedOption.value,
                        ),
                    )
                    .map((selectedOption) => selectedOption.value);
                field.onChange(optionsToUpdate);
            } else {
                const optionsToUpdate = (selectedOptions as SelectOption).value;
                field.onChange(optionsToUpdate);
            }
        },
        [isMulti, field, options],
    );

    return (
        <div className="bg-lm-black-200 mx-20 p-5">
            {label && (
                <span className="text-lm-white text-base font-medium">
                    {label}
                </span>
            )}
            <ReactSelect
                name={name}
                options={options}
                placeholder={placeholder}
                isMulti={isMulti}
                isDisabled={isDisabled}
                isClearable={isClearable}
                isSearchable={isSearchable}
                components={{ ...animatedComponents, DropdownIndicator }}
                value={handleSelectValue(field.value) ?? null}
                onChange={handleChange}
                unstyled
                classNames={{ ...getStyles<IsMulti, Group>(error) }}
                {...rest}
            />
            <span className="text-lm-red">{error}</span>
        </div>
    );
};

export { Select };
