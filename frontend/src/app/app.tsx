import { actions as appActions } from '~/app/store/app.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Loader,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { AuthApiPath } from './enums/enums.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { redirectPath } = useAppSelector(({ app }) => app);

    const { isRefreshing, dataStatus: authDataStatus } = useAppSelector(
        ({ auth }) => auth,
    );

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
            } else {
                dispatch(authActions.stopRefreshing());
            }
        };

        void refreshUser();
    }, [dispatch]);

    useEffect(() => {
        if (authDataStatus === DataStatus.REJECTED) {
            void storage.drop(StorageKey.TOKEN);
            navigate(AuthApiPath.SIGN_IN);
        }
    }, [authDataStatus, navigate]);

    if (isRefreshing) {
        return <Loader isOverflow />;
    }
    return <RouterOutlet />;
};

export { App };
