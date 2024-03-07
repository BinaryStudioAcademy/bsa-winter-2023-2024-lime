import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import {
    createSelector,
    selectAuth,
} from '~/bundles/common/redux/selectors/selectors.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

type ProtectedRouteProperties = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProperties> = ({ children }) => {
    const selectAuthDataStatus = useMemo(
        () =>
            createSelector([selectAuth], (auth) => ({
                isRefreshing: auth.isRefreshing,
                userAuthenticated: auth.user,
            })),
        [],
    );

    const { userAuthenticated, isRefreshing } =
        useAppSelector(selectAuthDataStatus);

    if (!userAuthenticated && !isRefreshing) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return children;
};

export { ProtectedRoute };
