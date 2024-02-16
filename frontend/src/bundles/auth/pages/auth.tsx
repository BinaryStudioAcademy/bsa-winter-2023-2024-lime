import { useNavigate } from 'react-router-dom';
import { type UserAuthRequestDto } from 'shared';

import logo from '~/assets/img/icons/lime-logo.svg';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';

import { SignInForm, SignUpForm } from '../components/components.js';
import { type UserSignUpForm } from '../components/sign-up-form/interface.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isLoading = dataStatus === DataStatus.PENDING;

    useEffect(() => {
        if (dataStatus === DataStatus.FULFILLED) {
            navigate(AppRoute.ROOT);
        }
    }, [dataStatus, navigate]);

    const handleSignInSubmit = useCallback((): void => {
        // handle sign in
    }, []);

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpForm): void => {
            const { email, password } = payload;
            const signUpDTO: UserAuthRequestDto = { email, password };

            void dispatch(authActions.signUp(signUpDTO));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
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

    return (
        <main className="bg-auth flex h-screen w-full bg-cover p-4">
            <div className="bg-lm-black-200 mr-2 w-[35rem] rounded-[2.75rem] p-[1rem] sm:p-[2rem] lg:p-[4rem]">
                {getScreen(pathname)}
            </div>
            <div className="md: m-auto hidden max-w-full p-3 sm:transform md:inline-block">
                <img src={logo} alt="LIME Logo" />
            </div>
        </main>
    );
};

export { Auth };
