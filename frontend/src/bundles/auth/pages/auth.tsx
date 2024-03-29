import authLogo from '~/assets/img/auth-logo.svg';
import { IdentityProvider } from '~/bundles/auth/enums/enums.js';
import {
    ForgotPasswordForm,
    Modal,
    Navigate,
} from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
    useNavigate,
    useSearchParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as passwordResetActions } from '~/bundles/password-reset/store/password-reset.js';
import { type PasswordForgotRequestDto } from '~/bundles/password-reset/types/types.js';
import {
    type UserAuthSignInRequestDto,
    type UserAuthSignUpRequestDto,
} from '~/bundles/users/users.js';

import {
    PasswordForgotSuccessMessage,
    SignInForm,
    SignUpForm,
} from '../components/components.js';
import { type UserSignUpForm } from '../components/sign-up-form/type.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [searchParameters] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const [isPasswordForgot, setIsPasswordForgot] = useState(false);

    const { dataStatus, user } = useAppSelector(({ auth }) => auth);

    const { dataStatus: resetPasswordStatus } = useAppSelector(
        ({ passwordReset }) => passwordReset,
    );

    const isLoading = dataStatus === DataStatus.PENDING;

    const isResetPasswordLoading = resetPasswordStatus === DataStatus.PENDING;

    const handleGoogleOAuth = useCallback((): void => {
        const referralCode = searchParameters.get('referralCode');
        void dispatch(
            authActions.authorizeIdentity({
                provider: IdentityProvider.GOOGLE,
                referralCode: referralCode ?? null,
            }),
        );
    }, [dispatch, searchParameters]);

    const handleSignInSubmit = useCallback(
        (payload: UserAuthSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpForm): void => {
            const { email, password } = payload;
            const referralCode = searchParameters.get('referralCode');

            const signUpDTO: UserAuthSignUpRequestDto = {
                email,
                password,
                referralCode,
            };

            void dispatch(authActions.signUp(signUpDTO));
        },
        [dispatch, searchParameters],
    );

    const handleForgotPassword = useCallback(
        (payload: PasswordForgotRequestDto): void => {
            void dispatch(passwordResetActions.forgotPassword(payload));
        },
        [dispatch],
    );

    const handleOpenModal = useCallback((): void => {
        void setIsOpen(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        void setIsOpen(false);

        if (isPasswordForgot) {
            void setIsPasswordForgot(false);
        }
    }, [isPasswordForgot]);

    useEffect(() => {
        if (resetPasswordStatus === DataStatus.FULFILLED) {
            setIsPasswordForgot(true);
        }
    }, [navigate, resetPasswordStatus]);

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return (
                    <SignInForm
                        onSubmit={handleSignInSubmit}
                        onModalOpen={handleOpenModal}
                        isLoading={isLoading}
                        handleOAuth={handleGoogleOAuth}
                    />
                );
            }
            case AppRoute.SIGN_UP: {
                return (
                    <SignUpForm
                        onSubmit={handleSignUpSubmit}
                        isLoading={isLoading}
                        handleOAuth={handleGoogleOAuth}
                    />
                );
            }
        }

        return null;
    };

    const classes = {
        base: 'relative flex flex-col flex-1 mx-[1rem] my-[1.125rem] rounded-[2.75rem] bg-secondary lg:flex-none lg:w-[45rem]',
        form: 'justify-between text-primary px-[2rem] pb-[3.75rem] sm:pt-[6rem] pt-[10rem] lg:px-[11.25rem] lg:justify-center lg:pt-0 lg:pb-0 min-h-[46rem]',
        main: 'bg-auth overflow-y-auto flex h-screen flex-col-reverse bg-cover bg-no-repeat lg:flex-row',
        logoContainer:
            'hidden flex-1 items-center justify-center text-xl text-primary lg:flex',
    };

    if (user) {
        return <Navigate to={AppRoute.OVERVIEW} />;
    }

    return (
        <main className={getValidClassNames(classes.main)}>
            <div className={getValidClassNames(classes.base, classes.form)}>
                {getScreen(pathname)}
            </div>
            <div className={getValidClassNames(classes.logoContainer)}>
                <img src={authLogo} alt="LIME Logo" />
            </div>
            <Modal
                isOpen={isOpen}
                title="Enter Your Email for Password Reset"
                onClose={handleCloseModal}
            >
                {isPasswordForgot ? (
                    <PasswordForgotSuccessMessage />
                ) : (
                    <ForgotPasswordForm
                        isLoading={isResetPasswordLoading}
                        onSubmit={handleForgotPassword}
                    />
                )}
            </Modal>
        </main>
    );
};

export { Auth };
