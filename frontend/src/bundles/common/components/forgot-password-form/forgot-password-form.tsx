import {
    type PasswordForgotRequestDto,
    passwordForgotValidationSchema,
} from 'shared';

import {
    Button,
    ButtonVariant,
    Input,
} from '~/bundles/common/components/components.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { DEFAULT_PASSWORD_FORGOT_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: PasswordForgotRequestDto) => void;
    onCancel: () => void;
    isLoading: boolean;
};

const ForgotPasswordForm: React.FC<Properties> = ({
    onSubmit,
    onCancel,
    isLoading,
}) => {
    const { control, errors, handleSubmit } =
        useAppForm<PasswordForgotRequestDto>({
            defaultValues: DEFAULT_PASSWORD_FORGOT_PAYLOAD,
            validationSchema: passwordForgotValidationSchema,
            mode: 'onSubmit',
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
        <form className="text-sm text-white" onSubmit={handleFormSubmit}>
            <div className="mb-8">
                <Input
                    type="email"
                    label="Email"
                    placeholder="email@gmail.com"
                    name="email"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
            </div>

            <div className="flex gap-4 sm:flex-col lg:flex-row">
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
                    isDisabled={isLoading}
                    onClick={handleFormCancel}
                />
            </div>
        </form>
    );
};

export { ForgotPasswordForm };
