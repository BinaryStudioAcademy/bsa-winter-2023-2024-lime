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

import { type ValidationSchema } from '~/bundles/common/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    mode?: keyof ValidationMode;
    validationSchema?: ValidationSchema;
    shouldUnregister?: boolean;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    isDirty: boolean;
    isValid: boolean;
    handleSubmit: UseFormHandleSubmit<T>;
    reset: (
        values?: DefaultValues<T>,
        options?: { keepValues?: boolean },
    ) => void;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    defaultValues,
    mode = 'onSubmit',
    validationSchema,
    shouldUnregister = true,
}: Parameters<T>): ReturnValue<T> => {
    let parameters: UseFormProps<T> = {
        defaultValues,
        mode,
        shouldUnregister,
    };

    if (validationSchema) {
        parameters = {
            ...parameters,
            resolver: zodResolver(validationSchema),
        };
    }

    const {
        control,
        formState: { errors, isDirty, isValid },
        handleSubmit,
        reset,
    } = useForm<T>(parameters);

    return {
        control,
        errors,
        isDirty,
        isValid,
        handleSubmit,
        reset,
    };
};

export { useAppForm };
