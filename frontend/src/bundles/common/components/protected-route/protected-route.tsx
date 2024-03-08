import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

type ProtectedRouteProperties = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProperties> = ({ children }) => {
    const isRefreshing = useAppSelector(({ auth }) => auth.isRefreshing);
    const userAuthenticated = useAppSelector(({ auth }) => auth.user);

    if (!userAuthenticated && !isRefreshing) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return children;
};

export { ProtectedRoute };
