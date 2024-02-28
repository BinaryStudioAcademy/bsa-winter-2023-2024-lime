import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { BaseLayout } from '~/bundles/common/components/base-layout/base-layout.js';
import {
    Loader,
    RouterOutlet,
    ThemeSwitcher,
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
        return <Loader isOverflow />;
    }

    return (
        <BaseLayout>
            <RouterOutlet />
            <ThemeSwitcher />
        </BaseLayout>
    );
};

export { App };
