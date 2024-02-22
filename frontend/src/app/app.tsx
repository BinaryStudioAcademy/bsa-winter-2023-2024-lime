import { actions as appActions } from '~/app/store/app.js';
import reactLogo from '~/assets/img/react.svg';
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
import { actions as userActions } from '~/bundles/users/store/users.js';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { users, dataStatus, redirectPath } = useAppSelector(
        ({ users, app }) => ({
            users: users.users,
            dataStatus: users.dataStatus,
            redirectPath: app.redirectPath,
        }),
    );

    const isRoot = pathname === AppRoute.ROOT;
    const isLoading =
        dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [isRoot, dispatch]);

    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath);
            dispatch(appActions.navigate(null));
        }
    }, [dispatch, navigate, redirectPath]);

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
            {isRoot && (
                <>
                    <h2>Users:</h2>
                    <h3>Status: {isLoading ? <Loader /> : dataStatus}</h3>
                    <ul>
                        {users.map((it) => (
                            <li key={it.id}>{it.email}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export { App };
