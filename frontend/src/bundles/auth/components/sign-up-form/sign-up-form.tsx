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
import { userSignUpValidationSchema } from '~/bundles/users/users.js';

import { HeightBreakpoint } from '../constants/height-breakpoint.js';
import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';
import { type UserSignUpForm } from './type.js';

type Properties = {
    onSubmit: (payload: UserSignUpForm) => void;
    isLoading: boolean;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const isHeight = useHeight(HeightBreakpoint.small);

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
            <div>
                <h3 className="text-primary hsm:mb-2 mb-6 text-center text-[1.8rem] font-bold">
                    Hi! Create an Account
                </h3>
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

                <p className="text-lm-grey-100 hlg:mb-0 hlg:mt-3 mb-6 mt-10 text-center text-xs">
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
                        required
                    />

                    <Input
                        type={'password'}
                        label="Password"
                        name="password"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                        required
                    />

                    <Input
                        type="password"
                        label="Confirm Password"
                        name="passwordConfirm"
                        control={control}
                        errors={errors}
                        isDisabled={isLoading}
                        required
                    />

                    <div className="mb-2 mt-2">
                        <Button
                            type="submit"
                            label={isLoading ? '' : 'Sign Up'}
                            variant={ButtonVariant.PRIMARY}
                            size={
                                isHeight
                                    ? ComponentSize.SMALL
                                    : ComponentSize.MEDIUM
                            }
                            leftIcon={
                                isLoading && (
                                    <Loader color={IconColor.SECONDARY} />
                                )
                            }
                        />
                    </div>
                </form>
            </div>
            <p className="hmd:bottom-2 text-center text-sm lg:absolute lg:bottom-60 lg:left-1/2 lg:-translate-x-1/2 lg:transform">
                Already have an account? Go to{' '}
                <Link to={AppRoute.SIGN_IN}>
                    <span className="text-action">Sign in</span>
                </Link>
            </p>
        </>
    );
};

export { SignUpForm };
