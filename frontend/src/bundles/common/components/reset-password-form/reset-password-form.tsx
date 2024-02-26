import {
    Button,
    ButtonVariant,
    Input,
    Link,
} from '~/bundles/common/components/components.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { passwordResetValidationSchema } from '~/bundles/password-reset/enums/enums.js';
import { type PasswordResetPayload } from '~/bundles/password-reset/types/types.js';

import { DEFAULT_PASSWORD_RESET_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: PasswordResetPayload) => void;
    isLoading: boolean;
};

const ResetPasswordForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
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

    return (
        <>
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

                <Button
                    type="submit"
                    label="Send"
                    variant={ButtonVariant.PRIMARY}
                    size={ComponentSize.MEDIUM}
                    isDisabled={isLoading}
                />
            </form>
            <p className="text-center text-sm">
                Don`t whant to change password? Go to{' '}
                <Link to={AppRoute.SIGN_IN}>
                    <span className="text-lm-yellow-100">Log in</span>
                </Link>
            </p>
        </>
    );
};

export { ResetPasswordForm };
