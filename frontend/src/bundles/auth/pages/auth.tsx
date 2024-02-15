import authLogo from '~/assets/img/auth-logo.svg';
import { Loader } from '~/bundles/common/components/components.js';
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
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    const classes = {
        base: 'relative flex flex-col flex-1 bg-lm-black-200 mx-[1rem] my-[1.125rem] rounded-[2.75rem] lg:flex-none lg:w-[44rem]',
        form: 'justify-between text-white px-[2rem] pb-[3.75rem] pt-[10rem] lg:px-[11.25rem]',
    };

    return (
        <main className="bg-auth flex h-screen flex-col-reverse bg-cover bg-no-repeat lg:flex-row">
            <div
                className={getValidClassNames(
                    classes.base,
                    !isLoading && classes.form,
                )}
            >
                {isLoading ? <Loader isOverflow /> : getScreen(pathname)}
            </div>
            <div className="flex flex-1 items-center justify-center text-xl text-white">
                <img src={authLogo} alt="LIME Logo" />
            </div>
        </main>
    );
};

export { Auth };
