import { type ReactNode } from 'react';

import { AppRoute } from '../../enums/app-route.enum.js';
import { Navigate, useAppSelector } from '../../hooks/hooks.js';
import { type AsyncThunkConfig } from '../../types/async-thunk-config.type.js';

interface IProtectedRouteProperties {
    children: ReactNode;
    private: boolean;
}

const ProtectedRoute: React.FC<IProtectedRouteProperties> = ({
    children,
    private: isPrivate,
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
