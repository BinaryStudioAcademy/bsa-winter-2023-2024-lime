import { type ReactNode } from 'react';

import { AppRoute } from '../../enums/app-route.enum.js';
import { Navigate,useAppSelector } from '../../hooks/hooks.js';
import { type AsyncThunkConfig } from '../../types/async-thunk-config.type.js';

interface IProtectedRouteProperties {
    children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProperties> = ({ children }) => {
    const isLoggedIn = useAppSelector(
        (state: AsyncThunkConfig['state']) => state.auth.user,
    );
    if (!isLoggedIn) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return children;
};

export { ProtectedRoute };
