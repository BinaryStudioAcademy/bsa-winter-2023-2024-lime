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
    const { control, errors, isDirty, isValid, handleSubmit } =
        useAppForm<UserAuthRequestDto>({
            defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
            validationSchema: userAuthValidationSchema,
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
            <h1 className="text-center text-[1.875rem]">
                Hi! Login to your Account
            </h1>
            <form onSubmit={handleFormSubmit}>
                <Input
                    control={control}
                    errors={errors}
                    placeholder="email@gmail.com"
                    label="Email"
                    name="email"
                    type="text"
                />
                <Input
                    control={control}
                    errors={errors}
                    placeholder="&bull;"
                    label="Password"
                    name="password"
                    type="password"
                />
                <Button
                    label="Log In"
                    type="submit"
                    isDisabled={!isDirty || !isValid}
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.PRIMARY}
                />
            </form>
            <p className="text-center text-[0.875rem]">
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
