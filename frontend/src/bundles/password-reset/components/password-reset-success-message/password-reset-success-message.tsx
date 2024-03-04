import SuccessIcon from '~/assets/img/success-icon.svg?react';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

const PasswordResetSuccessMessage: React.FC = () => {
    return (
        <>
            <div className="flex w-64 flex-col gap-16 text-center md:w-[25rem]">
                <h1 className="text-primary text-[1.8rem] font-bold">
                    Set Up Your New Password
                </h1>
                <SuccessIcon className="fill-lm-yellow-100 mx-auto w-32" />
                <p className="text-primary text-xl leading-7">
                    Your password has been successfully reset. You can use it.
                    Please{' '}
                    <Link to={AppRoute.SIGN_IN}>
                        <span className="text-action">Sign in</span>
                    </Link>
                </p>
            </div>
        </>
    );
};

export { PasswordResetSuccessMessage };
