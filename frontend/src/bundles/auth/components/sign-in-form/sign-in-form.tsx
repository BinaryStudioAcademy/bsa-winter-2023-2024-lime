import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
    Link,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserAuthRequestDto,
    userAuthValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserAuthRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    // type need to change to UserSignInRequestDto
    const { control, errors, handleSubmit } = useAppForm<UserAuthRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userAuthValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <h1 className="text-center text-3xl">Hi! Login to your Account</h1>
            <form onSubmit={handleFormSubmit} className="w-4/5 md:w-96">
                <Input
                    control={control}
                    errors={errors}
                    placeholder="Enter your email"
                    label="Email"
                    name="email"
                    type="text"
                />

                <Input
                    control={control}
                    errors={errors}
                    placeholder="Enter your password"
                    label="Password"
                    name="password"
                    type="text"
                />
                <Button
                    label="Log In"
                    type="submit"
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.PRIMARY}
                />
            </form>
            <p className="text-center text-sm">
                No account?{' '}
                <Link to={AppRoute.SIGN_UP}>
                    <span className="text-lm-yellow-100">
                        Go to Create an account
                    </span>
                </Link>
            </p>
        </>
    );
};

export { SignInForm };
