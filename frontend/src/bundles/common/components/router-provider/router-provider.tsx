import {
    createBrowserRouter,
    RouterProvider as LibraryRouterProvider,
} from 'react-router-dom';

import { type RouteObjectExtended } from '../../types/types.js';
import { ProtectedRoute } from '../protected-route/protected-route.js';

type Properties = {
    routes: RouteObjectExtended[];
};

const RouterProvider: React.FC<Properties> = ({ routes }) => {
    const mappedRoutes = routes.map((route) => ({
        ...route,
        element: (
            <ProtectedRoute key={route.path} private={route.private ?? false}>
                {route.element}
            </ProtectedRoute>
        ),
    }));
    return <LibraryRouterProvider router={createBrowserRouter(mappedRoutes)} />;
};

export { RouterProvider };
