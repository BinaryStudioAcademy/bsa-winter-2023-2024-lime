import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

type Properties = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const { isRefreshing, dataStatus, user } = useAppSelector(
        ({ auth }) => auth,
    );

    if (dataStatus === DataStatus.FULFILLED) {
        if (!isRefreshing && !user) {
            return <Navigate to={AppRoute.SIGN_IN} />;
        }
        return children;
    }
};

export { ProtectedRoute };
