import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '../../enums/app-route.enum.js';
import { type AsyncThunkConfig } from '../../types/async-thunk-config.type.js';

const ProtectedRoute: React.FC = () => {
    const isLoggedIn = useSelector(
        (state: AsyncThunkConfig['state']) => state.auth.isLoggedIn,
    );
    if (!isLoggedIn) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return <Outlet />;
};

export { ProtectedRoute };
