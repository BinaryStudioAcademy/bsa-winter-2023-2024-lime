import { type GroupBase, type Props } from 'react-select';

import { Select } from '~/bundles/common/components/components.js';
import { type SelectOption } from '~/bundles/common/components/select/types/select.type.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

type Properties<
    IsMulti extends boolean = false,
    Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
> = Props<SelectOption, IsMulti, Group> & {
    name: 'option';
    label?: string;
};

const SelectStory = <
    IsMulti extends boolean = false,
    Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
    name,
    options,
    label = '',
    placeholder = 'Select something...',
    isMulti,
    isDisabled = false,
    isClearable = false,
    isSearchable = false,
    ...rest
}: Properties<IsMulti, Group>): JSX.Element => {
    const { control, errors } = useAppForm<{ option: string }>({
        defaultValues: { option: '' },
    });
    return (
        <Select
            control={control}
            errors={errors}
            name={name}
            placeholder={placeholder}
            label={label}
            options={options}
            isMulti={isMulti}
            isDisabled={isDisabled}
            isClearable={isClearable}
            isSearchable={isSearchable}
            {...rest}
        />
    );
};

export { SelectStory };
