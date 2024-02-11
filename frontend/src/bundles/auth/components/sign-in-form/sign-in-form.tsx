import { Button } from '~/bundles/common/components/components.js';
import {
    ButtonSize,
    ButtonVariant,
} from '~/bundles/common/types/button.type.js';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
    <>
        <h1>Sign In</h1>
        <form>
            <Button
                label="Sign in"
                variant={ButtonVariant.Primary}
                size={ButtonSize.Medium}
            />
        </form>
    </>
);

export { SignInForm };
