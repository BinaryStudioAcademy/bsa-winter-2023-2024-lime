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
    className?: string;
};

const RadioCard = <T extends FieldValues>({
    name,
    id,
    label,
    value,
    control,
    className = '',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    return (
        <div className="">
            <input
                {...field}
                id={id}
                value={value}
                checked={field.value == value}
                type="radio"
                className={styles['radio-card']}
            />
            <label htmlFor={id} className={`${styles['label']} ${className}`}>
                {label}
            </label>
        </div>
    );
};

export { RadioCard };
