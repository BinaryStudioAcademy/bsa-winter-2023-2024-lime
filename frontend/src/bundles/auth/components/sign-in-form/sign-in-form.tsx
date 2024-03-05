import {
    Button,
    ButtonVariant,
    Icon,
    Input,
    Link,
    Loader,
} from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/icon-colors.enum.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import {
    useAppForm,
    useCallback,
    useHeight,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserAuthRequestDto,
    userAuthValidationSchema,
} from '~/bundles/users/users.js';

import { HeightBreakpoint } from '../constants/height-breakpoint.js';
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
    const isHeight = useHeight(HeightBreakpoint.small);
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
            <div>
                <h1 className="text-primary hsm:mb-2 hsm:text-[1.2rem] mb-6 text-center text-[1.8rem] font-bold">
                    Hi! Sign in to your Account
                </h1>
                <div className="flex flex-col gap-4">
                    <Button
                        size={
                            isHeight
                                ? ComponentSize.SMALL
                                : ComponentSize.MEDIUM
                        }
                        variant={ButtonVariant.SECONDARY}
                        label="Continue with "
                        rightIcon={<Icon name="googleLogoIcon" />}
                    />
                    <Button
                        size={
                            isHeight
                                ? ComponentSize.SMALL
                                : ComponentSize.MEDIUM
                        }
                        variant={ButtonVariant.SECONDARY}
                        label="Continue with "
                        rightIcon={<Icon name="facebookIcon" />}
                    />
                </div>

                <p className="text-secondary hlg:mb-0 hlg:mt-3 mb-6 mt-10 text-center text-xs">
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
                        type="submit"
                        label={isLoading ? '' : 'Sign In'}
                        variant={ButtonVariant.PRIMARY}
                        size={
                            isHeight
                                ? ComponentSize.SMALL
                                : ComponentSize.MEDIUM
                        }
                        leftIcon={
                            isLoading && <Loader color={IconColor.SECONDARY} />
                        }
                    />
                </form>
            </div>
            <p className="hmd:bottom-2 text-center text-sm lg:absolute lg:bottom-60 lg:left-1/2 lg:-translate-x-1/2 lg:transform">
                No account? Go to{' '}
                <Link to={AppRoute.SIGN_UP}>
                    <span className="text-action">Create an Account</span>
                </Link>
            </p>
        </>
    );
};

export { SignInForm };
