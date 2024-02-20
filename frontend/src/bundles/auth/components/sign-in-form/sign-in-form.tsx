import {
    Button,
    ButtonSize,
    ButtonVariant,
    Input,
    Link,
    Loader,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserAuthRequestDto,
    userAuthValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserAuthRequestDto) => void;
    onModalOpen: () => void;
    isLoading: boolean;
};

const SignInForm: React.FC<Properties> = ({
    onSubmit,
    onModalOpen,
    isLoading,
}) => {
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
            <h1 className="text-center text-3xl font-bold leading-8">
                Hi! Login to your Account
            </h1>
            <form
                onSubmit={handleFormSubmit}
                className="text-sm font-semibold leading-3"
            >
                <Input
                    type="email"
                    label="Email"
                    placeholder="email@gmail.com"
                    name="email"
                    control={control}
                    errors={errors}
                    isDisabled={isLoading}
                />
                <div className="relative">
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                    />

                    <div className="absolute -top-1 right-0">
                        <Button
                            className="[&]:text-lm-grey-100 h-[1.5rem] px-[0] py-[0]"
                            label="Forgot password?"
                            type="button"
                            size={ButtonSize.SMALL}
                            variant={ButtonVariant.TERTIARY}
                            onClick={onModalOpen}
                        />
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        label={isLoading ? '' : 'Log In'}
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        isDisabled={isLoading}
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
