import { actions as appActions } from '~/app/store/app.js';
import reactLogo from '~/assets/img/react.svg';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Link,
    Loader,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useLocation,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { dataStatus, redirectPath } = useAppSelector(
        ({ auth, app }) => ({
            isRefreshing: auth.isRefreshing,
            dataStatus: auth.dataStatus,
            redirectPath: app.redirectPath,
        }),
    );

    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath);
            dispatch(appActions.navigate(null));
        }
    }, [dispatch, navigate, redirectPath]);

    useEffect(() => {
        void dispatch(authActions.refreshUser());
    }, [dispatch]);

    if (dataStatus === DataStatus.PENDING) {
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
                <li>
                    <Link to={AppRoute.SUBSCRIPTION}>SUBSCRIPTION</Link>
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
