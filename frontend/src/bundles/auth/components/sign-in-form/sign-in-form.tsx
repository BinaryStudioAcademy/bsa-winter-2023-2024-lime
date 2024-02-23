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
        mode: 'onTouched',
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
                <h1 className="mb-6 text-left text-[1.875rem] font-bold text-white">
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

                <p className="text-lm-grey-100 mb-6 mt-10 text-center text-xs">
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
                        required
                    />

                    <div className="relative mb-8">
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            control={control}
                            errors={errors}
                            isDisabled={isLoading}
                            required
                        />

                        <div className="absolute right-0 top-0">
                            <Button
                                className="[&]:text-lm-grey-100 h-[1.5rem] px-[0] py-[0]"
                                label="Forgot password?"
                                type="button"
                                size={ComponentSize.SMALL}
                                variant={ButtonVariant.TERTIARY}
                                onClick={onModalOpen}
                            />
                        </div>
                    </div>

                    <Button
                        label={isLoading ? '' : 'Log In'}
                        leftIcon={
                            isLoading && <Loader color={IconColor.SECONDARY} />
                        }
                        type="submit"
                        isDisabled={isLoading}
                        size={ComponentSize.MEDIUM}
                        variant={ButtonVariant.PRIMARY}
                    />
                </form>
                <p className="text-center text-sm">
                    No account? Go to{' '}
                    <Link to={AppRoute.SIGN_UP}>
                        <span className="text-lm-yellow-100">
                            Create an account
                        </span>
                    </Link>
                </p>
            </div>
        </>
    );
};

export { SignInForm };
