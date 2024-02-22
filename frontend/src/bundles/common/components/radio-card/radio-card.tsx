import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

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

    const handleLabelClick = useCallback((): void => {
        void field.onChange(value);
    }, [field, value]);

    return (
        /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
        <div className="">
            <input
                {...field}
                id={id}
                value={value}
                checked={field.value == value}
                type="radio"
                className={styles['radio-card']}
            />
            <label
                htmlFor={name}
                className={`${styles['label']} ${className}`}
                onClick={handleLabelClick}
            >
                {label}
            </label>
        </div>
        /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    );
};

export { RadioCard };
