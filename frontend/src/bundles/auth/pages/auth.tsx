import authLogo from '~/assets/img/auth-logo.svg';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { type UserAuthRequestDto } from '~/bundles/users/users.js';

import { SignInForm, SignUpForm } from '../components/components.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus, message } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
        message: auth.message,
    }));
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSignInSubmit = useCallback(
        (payload: UserAuthRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserAuthRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    useEffect(() => {
        if (dataStatus === DataStatus.FULFILLED) {
            navigate(AppRoute.ROOT);
        }
    }, [dataStatus, navigate]);

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return (
                    <SignInForm
                        onSubmit={handleSignInSubmit}
                        errorMessage={message}
                    />
                );
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        <main className="bg-auth flex h-screen flex-col-reverse items-center justify-center bg-cover bg-no-repeat lg:flex-row lg:items-stretch">
            <div className="bg-lm-black-200 text-lm-white  my-5 flex w-5/6 flex-col items-center justify-between rounded-[2rem] pb-6 pt-44 lg:ml-4 lg:w-2/5">
                {getScreen(pathname)}
            </div>
            <div className="text-lm-white flex flex-col items-center justify-center text-xl lg:w-3/5">
                <img src={authLogo} alt="LIME Logo" />
            </div>
        </main>
    );
};

export { Auth };
