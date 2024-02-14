import { type ReactNode } from 'react';

import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

type ProtectedRouteProperties = {
    children: ReactNode;
    isPrivate: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProperties> = ({
    children,
    isPrivate,
}) => {
    const userAuthenticated = useAppSelector(
        (state: AsyncThunkConfig['state']) => state.auth.user,
    );
    if (isPrivate && Object.keys(userAuthenticated).length === 0) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return children;
};

export { ProtectedRoute };
