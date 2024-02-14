import {
    createBrowserRouter,
    RouterProvider as LibraryRouterProvider,
} from 'react-router-dom';

import { ProtectedRoute } from '~/bundles/common/components/components.js';
import { type RouteObject } from '~/bundles/common/types/types.js';

type Properties = {
    routes: RouteObject[];
};

const RouterProvider: React.FC<Properties> = ({ routes }) => {
    const mappedRoutes = routes.map((route) => ({
        ...route,
        element: (
            <ProtectedRoute
                key={route.path}
                isPrivate={route.isPrivate ?? false}
            >
                {route.element}
            </ProtectedRoute>
        ),
    }));
    return <LibraryRouterProvider router={createBrowserRouter(mappedRoutes)} />;
};

export { RouterProvider };
