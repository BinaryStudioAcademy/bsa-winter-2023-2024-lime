import { passwordResetValidationSchema } from 'shared';

import {
    Button,
    ButtonVariant,
    Input,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type PasswordResetPayload } from '~/bundles/password-reset/types/types.js';

import { DEFAULT_PASSWORD_RESET_PAYLOAD } from './constants/constants.js';

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
    const { control, errors, handleSubmit } = useAppForm<PasswordResetPayload>({
        defaultValues: DEFAULT_PASSWORD_RESET_PAYLOAD,
        validationSchema: passwordResetValidationSchema,
        mode: 'onTouched',
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
        <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
                <Input
                    type="password"
                    label="New Password"
                    name="password"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />
            </div>

            <div className="mb-12">
                <Input
                    type="password"
                    label="Confirm New Password"
                    name="passwordConfirm"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />
            </div>

            <div className="flex gap-5 sm:flex-col lg:flex-row">
                <Button
                    type="submit"
                    label="Send"
                    variant={ButtonVariant.PRIMARY}
                    size={ComponentSize.MEDIUM}
                    isDisabled={isLoading}
                />

                <Button
                    type="button"
                    label="Cancel"
                    variant={ButtonVariant.PRIMARY}
                    size={ComponentSize.MEDIUM}
                    onClick={handleFormCancel}
                />
            </div>
        </form>
    );
};

export { ResetPasswordForm };
