import {
    Button,
    ButtonVariant,
    Icon,
    Input,
    Link,
    Loader,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { AppRoute, ComponentSize } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { userSignUpValidationSchema } from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';
import { type UserSignUpForm } from './type.js';

type Properties = {
    onSubmit: (payload: UserSignUpForm) => void;
    isLoading: boolean;
    handleOAuth: () => void;
};

const SignUpForm: React.FC<Properties> = ({
    onSubmit,
    isLoading,
    handleOAuth,
}) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpForm>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
        mode: 'onSubmit',
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <div>
                <h3 className="text-primary mb-6 text-left text-[1.8rem] font-bold">
                    Hi! Create an Account
                </h3>
                <div className="flex flex-col gap-4">
                    <Button
                        size={ComponentSize.MEDIUM}
                        variant={ButtonVariant.SECONDARY}
                        label="Continue with "
                        rightIcon={<Icon name="googleLogoIcon" />}
                        onClick={handleOAuth}
                    />
                </div>

                <p className="text-secondary mb-6 mt-10 text-center text-xs">
                    or Sign up with Email
                </p>
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-5"
                >
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
                                isLoading && (
                                    <Loader color={IconColor.SECONDARY} />
                                )
                            }
                        />
                    </div>
                </form>
            </div>
            <p className="mt-3 text-center text-sm lg:absolute lg:bottom-60 lg:left-1/2 lg:-translate-x-1/2 lg:transform">
                Already have an Account? Go to{' '}
                <Link to={AppRoute.SIGN_IN}>
                    <span className="text-action">Sign in</span>
                </Link>
            </p>
        </>
    );
};

export { SignUpForm };
