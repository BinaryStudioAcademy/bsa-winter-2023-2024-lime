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
    const { control, errors, handleSubmit } = useAppForm<UserAuthRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userAuthValidationSchema,
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
            <h1 className="text-center text-[1.88rem] font-bold text-slate-50">
                Hi! Login to your Account
            </h1>
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
                or Sign in with Email
            </p>

            <form onSubmit={handleFormSubmit}>
                <Input
                    type="email"
                    label="Email"
                    placeholder="email@gmail.com"
                    name="email"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <Input
                    type="password"
                    label="Password"
                    name="password"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />

                <div className="mt-3">
                    <Button
                        type="submit"
                        label={isLoading ? '' : 'Log In'}
                        variant={ButtonVariant.PRIMARY}
                        size={ComponentSize.MEDIUM}
                        leftIcon={
                            isLoading && <Loader color={IconColor.SECONDARY} />
                        }
                    />
                </div>
            </form>
            <p className="text-center text-sm">
                No account? Go to{' '}
                <Link to={AppRoute.SIGN_UP}>
                    <span className="text-lm-yellow-100">
                        Create an account
                    </span>
                </Link>
            </p>
        </>
    );
};

export { SignInForm };
