import { Link } from 'react-router-dom';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
    Loader,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { userSignUpValidationSchema } from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';
import { type UserSignUpForm } from './type.js';

type Properties = {
    onSubmit: (payload: UserSignUpForm) => void;
    isLoading: boolean;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const { control, errors, isValid, handleSubmit } =
        useAppForm<UserSignUpForm>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationSchema,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <div className="flex flex-col justify-center gap-6 rounded-[2.75rem] font-sans text-white">
            <h3 className="text-center text-[1.88rem] font-bold text-slate-50">
                Hi! Create an account
            </h3>
            <div className="flex flex-col gap-4">
                <Button
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.SECONDARY}
                    label="Continue with "
                    rightIcon="G"
                />
                <Button
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.SECONDARY}
                    label="Continue with "
                    rightIcon="f"
                />
            </div>

            <p className="text-lm-grey-100 text-center text-xs">
                or Sign up with Email
            </p>
            <form onSubmit={handleFormSubmit} className="mb-8 gap-3">
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

                <div className="mt-4">
                    <Button
                        type="submit"
                        label={isLoading ? '' : 'Sign Up'}
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        isDisabled={!isValid || isLoading}
                        leftIcon={isLoading && <Loader />}
                    />
                </div>
            </form>
            <p className="mt-10 text-center text-sm">
                Already have an account? Go to
                <Link to={AppRoute.SIGN_IN} className="text-lm-yellow-100">
                    {' '}
                    Log in
                </Link>
            </p>
        </div>
    );
};

export { SignUpForm };
