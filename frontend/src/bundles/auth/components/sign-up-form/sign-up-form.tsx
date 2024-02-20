import {
    Button,
    ButtonVariant,
    Input,
    Link,
    Loader,
} from '~/bundles/common/components/components.js';
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
            <h3 className="text-center text-[1.88rem] font-bold text-slate-50">
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

            <p className="text-lm-grey-100 text-center text-xs">
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
                />

                <Input
                    type={'password'}
                    label="Password"
                    name="password"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />

                <Input
                    type="password"
                    label="Confirm Password"
                    name="passwordConfirm"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />

                <div className="mt-3">
                    <Button
                        type="submit"
                        label={isLoading ? '' : 'Sign Up'}
                        variant={ButtonVariant.PRIMARY}
                        size={ComponentSize.MEDIUM}
                        isDisabled={isLoading}
                        leftIcon={isLoading && <Loader />}
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
