import authLogo from '~/assets/img/auth-logo.svg';
import {
    ForgotPasswordForm,
    Modal,
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
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { createSelector } from '~/bundles/common/redux/selectors/selectors.js';
import { type RootState } from '~/bundles/common/types/redux-store-rootstate.js';
import { actions as passwordResetActions } from '~/bundles/password-reset/store/password-reset.js';
import { type PasswordForgotRequestDto } from '~/bundles/password-reset/types/types.js';
import { type UserAuthRequestDto } from '~/bundles/users/users.js';

import {
    PasswordForgotSuccessMessage,
    SignInForm,
    SignUpForm,
} from '../components/components.js';
import { type UserSignUpForm } from '../components/sign-up-form/type.js';
import { actions as authActions } from '../store/auth.js';

const subscriptionDataStatus = (state: RootState): RootState['auth'] =>
    state.auth;

const subscriptionPassDataStatus = (
    state: RootState,
): RootState['passwordReset'] => state.passwordReset;

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isPasswordForgot, setIsPasswordForgot] = useState(false);

    const selectAuthDataStatus = createSelector(
        [subscriptionDataStatus],
        (auth) => ({
            dataStatus: auth.dataStatus,
        }),
    );

    const { dataStatus } = useAppSelector(selectAuthDataStatus);

    const selectPasswordResetDataStatus = createSelector(
        [subscriptionPassDataStatus],
        (passwordReset) => ({
            dataStatus: passwordReset.dataStatus,
        }),
    );

    const { dataStatus: resetPasswordStatus } = useAppSelector(
        selectPasswordResetDataStatus,
    );

    const isLoading = dataStatus === DataStatus.PENDING;

    const isResetPasswordLoading = resetPasswordStatus === DataStatus.PENDING;

    const handleSignInSubmit = useCallback(
        (payload: UserAuthRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpForm): void => {
            const { email, password } = payload;
            const signUpDTO: UserAuthRequestDto = { email, password };

            void dispatch(authActions.signUp(signUpDTO));
        },
        [dispatch],
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
        if (dataStatus === DataStatus.FULFILLED) {
            navigate(AppRoute.ROOT);
        }
    }, [dataStatus, navigate]);

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
                    />
                );
            }
            case AppRoute.SIGN_UP: {
                return (
                    <SignUpForm
                        onSubmit={handleSignUpSubmit}
                        isLoading={isLoading}
                    />
                );
            }
        }

        return null;
    };

    const classes = {
        base: 'relative flex flex-col flex-1 mx-[1rem] my-[1.125rem] rounded-[2.75rem] bg-primary lg:flex-none lg:w-[45rem]',
        form: 'justify-between text-primary px-[2rem] pb-[3.75rem] pt-[10rem] lg:px-[11.25rem] lg:justify-center lg:pt-0 lg:pb-0',
        main: 'bg-auth flex h-screen flex-col-reverse bg-cover bg-no-repeat lg:flex-row',
        logoContainer:
            'hidden flex-1 items-center justify-center text-xl text-primary lg:flex',
    };

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
