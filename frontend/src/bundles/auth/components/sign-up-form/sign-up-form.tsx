import { Button, Input } from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
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
        <>
            <h3>Sign Up</h3>
            <form onSubmit={handleFormSubmit}>
                <p>
                    <Input
                        type="text"
                        label="Email"
                        placeholder="email@gmail.com"
                        name="email"
                        control={control}
                        errors={errors}
                    />
                </p>
                <p>
                    <Input
                        type="password"
                        label="Password"
                        placeholder="&bull;"
                        name="password"
                        control={control}
                        errors={errors}
                    />
                </p>
                <p>
                    <Input
                        type="password"
                        label="Confirm Password"
                        placeholder="&bull;"
                        name="passwordConfirm"
                        control={control}
                        errors={errors}
                    />
                </p>
                <Button type="submit" label="Sign up" />
            </form>
        </>
    );
};

export { SignUpForm };
