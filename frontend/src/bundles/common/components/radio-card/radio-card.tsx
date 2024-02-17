import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.css';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    id: string;
    label: string;
    value: string;
    control: Control<T>;
    checked?: boolean;
};

const RadioCard = <T extends FieldValues>({
    name,
    id,
    label,
    value,
    control,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    return (
        <div className="flex items-center py-1">
            <input
                {...field}
                id={id}
                value={value}
                checked={field.value == value}
                type="radio"
                className={styles['radio-card']}
            />
            <label htmlFor={name} className={styles['label']}>
                {label}
            </label>
        </div>
    );
};

export { RadioCard };
