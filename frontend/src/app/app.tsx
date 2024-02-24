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

const App: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const refreshUser = async (): Promise<void> => {
            try {
                await dispatch(authActions.refreshUser());
            } finally {
                setIsRefreshing(false);
            }
        };

        void refreshUser();
    }, [dispatch]);

    if (isRefreshing) {
        return <Loader />;
    }

    return <RouterOutlet />;
};

export { App };
