import { zodResolver } from '@hookform/resolvers/zod';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type Path,
    type UseFormClearErrors,
    type UseFormHandleSubmit,
    type UseFormProps,
    type UseFormWatch,
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
    getValues: () => T;
    setValue: (
        name: Path<T>,
        value: unknown,
        options?: { shouldValidate?: boolean; shouldDirty?: boolean },
    ) => void;
    clearErrors: UseFormClearErrors<T>;
    watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    defaultValues,
    mode = 'onTouched',
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
        getValues,
        setValue: setValueFromForm,
        clearErrors,
        watch,
    } = useForm<T>(parameters);

    const setValue = (
        name: Path<T>,
        value: unknown,
        options?: { shouldValidate?: boolean; shouldDirty?: boolean },
    ): void => {
        setValueFromForm(name, value as T[keyof T], options);
    };

    return {
        control,
        errors,
        isDirty,
        isValid,
        handleSubmit,
        reset,
        getValues,
        setValue,
        clearErrors,
        watch,
    };
};

export { useAppForm };
