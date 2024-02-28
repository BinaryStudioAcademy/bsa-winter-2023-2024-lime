import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Loader,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const App: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(true);
    const dispatch = useAppDispatch();

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
