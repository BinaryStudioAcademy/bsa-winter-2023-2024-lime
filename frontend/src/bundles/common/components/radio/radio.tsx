import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { RadioType } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useFormController } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    id: string;
    label: string;
    value: string;
    control: Control<T>;
    type: ValueOf<typeof RadioType>;
    className?: string;
};

const Radio = <T extends FieldValues>({
    name,
    id,
    label,
    value,
    control,
    type,
    className = '',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const radioTypeToClasses: Record<
        ValueOf<typeof RadioType>,
        {
            container: string;
            input: string;
            inputChecked: string;
            label: string;
            labelChecked: string;
        }
    > = {
        [RadioType.ROUND]: {
            container: 'flex items-center py-1',
            input: 'peer/radio border-lm-grey-500 relative h-4 w-4 cursor-pointer appearance-none rounded-full border-2 bg-transparent',
            inputChecked:
                'checked:border-lm-yellow-100 checked:after:bg-lm-yellow-100 checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2 checked:after:w-2 checked:after:rounded-full checked:after:[transform:translate(-50%,-50%)]',
            label: 'text-lm-grey-500 ml-2 text-base',
            labelChecked: 'peer-checked/radio:text-lm-grey-200',
        },
        [RadioType.CARD]: {
            container: 'rounded-r-lg pt-9',
            input: 'peer/radio hidden',
            inputChecked: '',
            label: 'text-lm-grey-200 bg-lm-black-100 table-cell h-37 cursor-pointer px-6 py-2.5 text-center align-middle text-base',
            labelChecked:
                'peer-checked/radio:text-lm-black-100 peer-checked/radio:bg-lm-yellow-100',
        },
    };

    return (
        <div className={getValidClassNames(radioTypeToClasses[type].container)}>
            <input
                {...field}
                id={id}
                value={value}
                checked={field.value === value}
                type="radio"
                className={getValidClassNames(
                    radioTypeToClasses[type].input,
                    radioTypeToClasses[type].inputChecked,
                )}
            />
            <label
                htmlFor={id}
                className={getValidClassNames(
                    radioTypeToClasses[type].label,
                    radioTypeToClasses[type].labelChecked,
                    className,
                )}
            >
                {label}
            </label>
        </div>
    );
};

export { Radio };
