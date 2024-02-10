import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues
} from 'react-hook-form';
import ReactSelect from 'react-select';

import { useCallback, useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.css';

type SelectOption = {
    label: string;
    value: string;
};

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

    const handleChange = useCallback(
        (option: unknown) => {
            const fieldValue = (option as SelectOption)?.value ?? null;
            field.onChange(fieldValue);
        },
        [field],
    );

    return (
        <div>
            {label && <span className={styles['label']}>{label}</span>}
            <ReactSelect
                className='select'
                placeholder={placeholder}
                options={options}
                isMulti={isMulti}
                isDisabled={isDisabled}
                isClearable={isClearable}
                onChange={handleChange}
            />
            <span className={styles['error']}>{error}</span>
        </div>

    );
};

export { Select };
