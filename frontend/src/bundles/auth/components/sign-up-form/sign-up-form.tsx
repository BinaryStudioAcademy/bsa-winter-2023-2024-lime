import { Link } from 'react-router-dom';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { userSignUpValidationSchema } from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';
import { type UserSignUpForm } from './interface.js';

type Properties = {
    onSubmit: (payload: UserSignUpForm) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
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
        <div className="bg-lm-black-200 m-auto flex min-h-[988px] max-w-[705px] flex-col items-center justify-center gap-5 rounded-[44px] pb-12 font-sans text-white">
            <h3 className="text-[30px] font-bold text-slate-50">
                Hi! Create an account
            </h3>
            <p className="text-lm-grey-100 text-xs">or Sign up with Email</p>
            <form onSubmit={handleFormSubmit} className="mb-10 w-[358px]">
                <Input
                    type="text"
                    label="Email"
                    placeholder="email@gmail.com"
                    name="email"
                    control={control}
                    errors={errors}
                />

                <Input
                    type="password"
                    label="Password"
                    placeholder="&bull;"
                    name="password"
                    control={control}
                    errors={errors}
                />

                <Input
                    type="password"
                    label="Confirm Password"
                    placeholder="&bull;"
                    name="passwordConfirm"
                    control={control}
                    errors={errors}
                />

                <Button
                    type="submit"
                    label="Sign Up"
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    isDisabled={!isValid}
                />
            </form>
            <p className="text-sm">
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
