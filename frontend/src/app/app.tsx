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
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { redirectPath, isRefreshing } = useAppSelector(({ app, auth }) => ({
        redirectPath: app.redirectPath,
        isRefreshing: auth.isRefreshing,
    }));

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

        void refreshUser();
    }, [dispatch]);

    if (isRefreshing) {
        return <Loader isOverflow />;
    }

    return <RouterOutlet />;
};

export { App };
