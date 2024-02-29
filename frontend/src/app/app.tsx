import { actions as appActions } from '~/app/store/app.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { BaseLayout } from '~/bundles/common/components/base-layout/base-layout.js';
import {
    Loader,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { redirectPath } = useAppSelector(({ app }) => ({
        redirectPath: app.redirectPath,
    }));

    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath);
            dispatch(appActions.navigate(null));
        }
    }, [dispatch, navigate, redirectPath]);

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
        </BaseLayout>
    );
};

export { App };
