import authLogo from '~/assets/img/auth-logo.svg';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
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
import { type UserSignUpForm } from '../components/sign-up-form/type.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const isLoading = dataStatus === DataStatus.PENDING;
    const { pathname } = useLocation();
    const navigate = useNavigate();

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
        base: 'relative flex flex-col flex-1 bg-lm-black-200 mx-[1rem] my-[1.125rem] rounded-[2.75rem] lg:flex-none lg:w-[45rem]',
        form: 'justify-between text-white px-[2rem] pb-[3.75rem] pt-[10rem] lg:px-[11.25rem] hlg:pt-[1rem] hmd:pb-[1rem]',
    };

    return (
        <main className="bg-auth flex h-screen min-h-[29rem] flex-col-reverse bg-cover bg-no-repeat lg:flex-row">
            <div className={getValidClassNames(classes.base, classes.form)}>
                {getScreen(pathname)}
            </div>
            <div className="hidden flex-1 items-center justify-center text-xl text-white lg:flex">
                <img src={authLogo} alt="LIME Logo" />
            </div>
        </main>
    );
};

export { Auth };
