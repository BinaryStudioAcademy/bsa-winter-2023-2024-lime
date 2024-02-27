import SuccessIcon from '~/assets/img/success-icon.svg?react';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

const PasswordResetSuccessMessage: React.FC = () => {
    return (
        <>
            <SuccessIcon className="fill-lm-yellow-100 mx-auto w-32" />
            <div className="flex flex-col items-center gap-16">
                <p className="text-primary text-xl leading-7">
                    Your password has been successfully reset. You can now use
                    it to{' '}
                    <Link to={AppRoute.SIGN_IN}>
                        <span className="text-action">log in</span>
                    </Link>
                </p>
            </div>
        </>
    );
};

export { PasswordResetSuccessMessage };
