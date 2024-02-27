import SuccessIcon from '~/assets/img/success-icon.svg?react';

const PasswordForgotSuccessMessage: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-16">
            <SuccessIcon className="fill-lm-yellow-100 w-32" />
            <p className="text-xl leading-7 text-white">
                Link for password reset was sent to your email. Check your inbox
                letters and follow the instructions. If you don’t see the email,
                please check your spam folder
            </p>
        </div>
    );
};

export { PasswordForgotSuccessMessage };
