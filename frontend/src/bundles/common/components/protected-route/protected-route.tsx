import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ReactNode } from '~/bundles/common/types/types.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

type Properties = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const { isRefreshing, user } = useAppSelector(({ auth }) => auth);

    if (!isRefreshing && !user) {
        void storage.drop(StorageKey.TOKEN);
        return <Navigate to={AppRoute.SIGN_IN} />;
    }
    return children;
};

export { ProtectedRoute };
