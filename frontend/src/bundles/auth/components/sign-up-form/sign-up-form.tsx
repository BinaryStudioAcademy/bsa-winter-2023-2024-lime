import {
    Button,
    ButtonVariant,
    Input,
    Link,
    Loader,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { userSignUpValidationSchema } from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';
import { type UserSignUpForm } from './type.js';

type Properties = {
    onSubmit: (payload: UserSignUpForm) => void;
    isLoading: boolean;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpForm>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
        mode: 'onBlur',
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <h3 className="text-left text-[1.875rem] font-bold text-white">
                Hi! Create an account
            </h3>
            <div className="flex flex-col gap-4">
                <Button
                    size={ComponentSize.MEDIUM}
                    variant={ButtonVariant.SECONDARY}
                    label="Continue with "
                    rightIcon="G"
                />
                <Button
                    size={ComponentSize.MEDIUM}
                    variant={ButtonVariant.SECONDARY}
                    label="Continue with "
                    rightIcon="f"
                />
            </div>

            <p className="dark:text-lm-grey-100 text-center text-xs">
                or Sign up with Email
            </p>
            <form onSubmit={handleFormSubmit}>
                <Input
                    type={'text'}
                    label="Email"
                    placeholder="email@gmail.com"
                    name="email"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />

                <Input
                    type={'password'}
                    label="Password"
                    name="password"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />

                <Input
                    type="password"
                    label="Confirm Password"
                    name="passwordConfirm"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                    required
                />

                <div className="mt-3">
                    <Button
                        type="submit"
                        label={isLoading ? '' : 'Sign Up'}
                        variant={ButtonVariant.PRIMARY}
                        size={ComponentSize.MEDIUM}
                        leftIcon={
                            isLoading && <Loader color={IconColor.SECONDARY} />
                        }
                    />
                </div>
            </form>
            <p className="text-center text-sm">
                Already have an account? Go to{' '}
                <Link to={AppRoute.SIGN_IN}>
                    <span className="text-lm-yellow-100">Log in</span>
                </Link>
            </p>
        </>
    );
};

export { SignUpForm };
