import { passwordResetValidationSchema } from 'shared';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
} from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { DEFAULT_PASSWORD_RESET_PAYLOAD } from './constants/constants.js';

type PasswordResetPayload = {
    password: string;
};

type PasswordReset = {
    password: string;
    passwordConfirm: string;
};

type Properties = {
    onSubmit: (payload: PasswordResetPayload) => void;
    onCancel: () => void;
    isLoading: boolean;
};

const ResetPasswordForm: React.FC<Properties> = ({
    onSubmit,
    isLoading,
    onCancel,
}) => {
    const { control, errors, isDirty, isValid, handleSubmit } =
        useAppForm<PasswordReset>({
            defaultValues: DEFAULT_PASSWORD_RESET_PAYLOAD,
            validationSchema: passwordResetValidationSchema,
            mode: 'onBlur',
            shouldUnregister: false,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const handleFormCancel = useCallback((): void => {
        void onCancel();
    }, [onCancel]);

    return (
        <form
            className="text-sm font-semibold leading-3 text-white"
            onSubmit={handleFormSubmit}
        >
            <div className="mb-4">
                <Input
                    type="password"
                    label="New Password"
                    placeholder="&bull;"
                    name="password"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
            </div>

            <div className="mb-12">
                <Input
                    type="password"
                    label="Confirm New Password"
                    placeholder="&bull;"
                    name="passwordConfirm"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
            </div>

            <div className="flex gap-5 sm:flex-col lg:flex-row">
                <Button
                    type="submit"
                    label="Send"
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    isDisabled={!isDirty || !isValid}
                />
                <Button
                    type="button"
                    label="Cancel"
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    onClick={handleFormCancel}
                />
            </div>
        </form>
    );
};

export { ResetPasswordForm };
