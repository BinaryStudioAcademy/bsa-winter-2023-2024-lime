import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

type ProtectedRouteProperties = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProperties> = ({ children }) => {
    const { isRefreshing, userAuthenticated, dataStatus } = useAppSelector(
        ({ auth }) => ({
            isRefreshing: auth.isRefreshing,
            userAuthenticated: auth.user,
            dataStatus: auth.dataStatus,
        }),
    );

    if (dataStatus === DataStatus.FULFILLED) {
        if (!isRefreshing && !userAuthenticated) {
            return <Navigate to={AppRoute.SIGN_IN} />;
        }
        return children;
    }
};

export { ProtectedRoute };
