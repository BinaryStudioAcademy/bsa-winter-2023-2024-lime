import {
    type PasswordForgotRequestDto,
    passwordForgotValidationSchema,
} from 'shared';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
} from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { DEFAULT_PASSWORD_FORGOT_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: PasswordForgotRequestDto) => void;
    onModalClose: () => void;
    isLoading: boolean;
};

const ForgotPasswordForm: React.FC<Properties> = ({
    onSubmit,
    onModalClose,
    isLoading,
}) => {
    const { control, errors, isDirty, isValid, handleSubmit } =
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
        void onModalClose();
    }, [onModalClose]);

    return (
        <form
            className="text-sm font-semibold leading-3 text-white"
            onSubmit={handleFormSubmit}
        >
            <div className="mb-8">
                <Input
                    type="text"
                    label="Email"
                    placeholder="email@gmail.com"
                    name="email"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
            </div>

            <div className="flex gap-5">
                <Button
                    type="submit"
                    label="Send"
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    isDisabled={!isDirty || !isValid || isLoading}
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

export { ForgotPasswordForm };
