import SuccessIcon from '~/assets/img/success-icon.svg?react';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

const PasswordResetSuccessMessage: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-16">
            <SuccessIcon className="fill-lm-yellow-100 w-32" />
            <p className="text-xl leading-7 text-white">
                Your password has been successfully reset. You can now use it to{' '}
                <Link to={AppRoute.SIGN_IN}>
                    <span className="text-lm-yellow-100">log in</span>
                </Link>
            </p>
        </div>
    );
};

export { PasswordResetSuccessMessage };
