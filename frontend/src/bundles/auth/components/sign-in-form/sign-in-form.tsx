import {
    Button,
    ButtonSize,
    ButtonVariant,
} from '~/bundles/common/components/components.js';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
    <>
        <h1>Sign In</h1>
        <form>
            <Button
                label="Sign in"
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.MEDIUM}
            />
        </form>
    </>
);

export { SignInForm };
