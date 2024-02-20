import {
    Button,
    ButtonVariant,
    Input,
    Link,
    Loader,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/enums.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { ThemeCompose } from '~/bundles/common/enums/theme-colors.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserAuthRequestDto,
    userAuthValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserAuthRequestDto) => void;
    isLoading: boolean;
};

const SignInForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const { control, errors, isDirty, isValid, handleSubmit } =
        useAppForm<UserAuthRequestDto>({
            defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
            validationSchema: userAuthValidationSchema,
            mode: 'onBlur',
            shouldUnregister: false,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <h1
                className={`text-center text-3xl font-bold leading-8 ${ThemeCompose.STANDART.TEXT}`}
            >
                Hi! Login to your Account
            </h1>
            <form onSubmit={handleFormSubmit} className="text-sm">
                <Input
                    control={control}
                    errors={errors}
                    placeholder="email@gmail.com"
                    label="Email"
                    name="email"
                    type="text"
                    isDisabled={isLoading}
                />
                <Input
                    control={control}
                    errors={errors}
                    placeholder="&bull;"
                    label="Password"
                    name="password"
                    type="password"
                    isDisabled={isLoading}
                />
                <Button
                    label={isLoading ? '' : 'Log In'}
                    leftIcon={
                        isLoading && <Loader color={IconColor.SECONDARY} />
                    }
                    type="submit"
                    isDisabled={!isDirty || !isValid || isLoading}
                    size={ComponentSize.MEDIUM}
                    variant={ButtonVariant.PRIMARY}
                />
            </form>
            <p className="text-center text-sm font-normal leading-4">
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
