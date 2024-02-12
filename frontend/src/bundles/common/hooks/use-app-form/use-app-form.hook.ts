import { zodResolver } from '@hookform/resolvers/zod';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type UseFormProps,
    type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema,type ValueOf } from '~/bundles/common/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    mode?: ValueOf<ValidationMode>;
    validationSchema?: ValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    defaultValues,
    mode = 'onSubmit',
    validationSchema,
}: Parameters<T>): ReturnValue<T> => {
    let parameters: UseFormProps<T> = {
        defaultValues,
        mode,
    };

    if (validationSchema) {
        parameters = {
            ...parameters,
            resolver: zodResolver(validationSchema),
        };
    }

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<T>(parameters);

    return {
        control,
        errors,
        handleSubmit,
    };
};

export { useAppForm };
