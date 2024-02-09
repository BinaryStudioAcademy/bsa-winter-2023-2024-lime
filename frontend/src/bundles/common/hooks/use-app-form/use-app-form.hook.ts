import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '~/bundles/common/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    validationSchema?: ValidationSchema;
    mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    validationSchema,
    defaultValues,
    mode,
}: Parameters<T>): ReturnValue<T> => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        mode,
        defaultValues,
        resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    });

    return {
        control,
        errors,
        handleSubmit,
    };
};

export { useAppForm };
