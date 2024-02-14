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
    const mapRoutes = (routes: RouteObject[]): RouteObject[] => {
        return routes.map((route) => {
            const isPrivate = route.isPrivate ?? false;

            if (route.children && route.children.length > 0) {
                route.children = mapRoutes(route.children);
            }

            route.element = isPrivate ? (
                <ProtectedRoute key={route.path} isPrivate={isPrivate}>
                    {route.element}
                </ProtectedRoute>
            ) : (
                route.element
            );

            return route;
        });
    };

    const mappedRoutes = mapRoutes(routes);

    return <LibraryRouterProvider router={createBrowserRouter(mappedRoutes)} />;
};

export { RouterProvider };
