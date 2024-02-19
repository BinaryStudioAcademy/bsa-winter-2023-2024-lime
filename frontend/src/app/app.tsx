import reactLogo from '~/assets/img/react.svg';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Link,
    Loader,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { isRefreshing } = useAppSelector(({ auth }) => ({
        isRefreshing: auth.isRefreshing,
    }));

    useEffect(() => {
        void dispatch(authActions.refreshUser());
    }, [dispatch]);

    if (isRefreshing) {
        return <Loader />;
    }

    return (
        <>
            <img src={reactLogo} width="30" alt="logo" />

            <ul>
                <li>
                    <Link to={AppRoute.ROOT}>Root</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_IN}>Sign in</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_UP}>Sign up</Link>
                </li>
            </ul>
            <p>Current path: {pathname}</p>

            <div>
                <RouterOutlet />
            </div>
        </>
    );
};

export { App };
