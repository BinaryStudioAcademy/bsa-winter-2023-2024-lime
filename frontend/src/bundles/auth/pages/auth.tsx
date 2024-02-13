import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

import { SignInForm, SignUpForm } from '../components/components.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback((): void => {
        // handle sign in
    }, []);

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

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

    return (
        <>
            state: {dataStatus}
            <main className="bg-auth flex h-screen flex-col-reverse bg-cover bg-no-repeat lg:flex-row">
                <div className="bg-lm-black-200 my-5 ml-4 flex w-2/5 flex-col justify-between rounded-[2rem] px-32 pb-6 pt-44 text-white">
                    {getScreen(pathname)}
                </div>
                <div className="flex w-3/5 flex-col items-center justify-center italic text-white">
                    <h1 className="stroke-white text-9xl font-black">
                        LIME
                        <span className="bg-lm-yellow-100 absolute h-16 w-16 rounded-full [transform:translate(20%,-50%)]" />
                    </h1>
                    <p className="text-3xl font-semibold">
                        Live In Motion Everyday
                    </p>
                </div>
            </main>
        </>
    );
};

export { Auth };
