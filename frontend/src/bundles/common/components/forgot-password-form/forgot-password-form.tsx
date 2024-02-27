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
    isLoading: boolean;
};

const ForgotPasswordForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
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
    );
};

export { ForgotPasswordForm };
