import { actions as appActions } from '~/app/store/app.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Loader,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useMemo,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    createSelector,
    selectRedirectPath,
} from '~/bundles/common/redux/selectors/selectors.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const App: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectAppRedirectPath = useMemo(
        () =>
            createSelector([selectRedirectPath], (app) => ({
                redirectPath: app.redirectPath,
            })),
        [],
    );

    const { redirectPath } = useAppSelector(selectAppRedirectPath);

    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath);
            dispatch(appActions.navigate(null));
        }
    }, [dispatch, navigate, redirectPath]);

    useEffect(() => {
        const refreshUser = async (): Promise<void> => {
            const token = await storage.get(StorageKey.TOKEN);

            if (token) {
                await dispatch(authActions.refreshUser());
            }
        };

        void refreshUser().finally(() => setIsRefreshing(false));
    }, [dispatch]);

    if (isRefreshing) {
        return <Loader isOverflow />;
    }

    return <RouterOutlet />;
};

export { App };
