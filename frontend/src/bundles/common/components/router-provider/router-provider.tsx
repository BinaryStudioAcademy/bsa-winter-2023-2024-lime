import {
    createBrowserRouter,
    RouterProvider as LibraryRouterProvider,
} from 'react-router-dom';

import { ProtectedRoute } from '~/bundles/common/components/components.js';
import {
    type LibraryRouteObject,
    type RouteObject,
} from '~/bundles/common/types/types.js';

type Properties = {
    routes: RouteObject[];
};
const RouterProvider: React.FC<Properties> = ({ routes }) => {
    const mapRoutes = (
        routes: RouteObject[],
        isAlreadyProtected = false,
    ): LibraryRouteObject[] =>
        routes.map(
            ({ isPrivate, element, children, path }): LibraryRouteObject => {
                const shouldProtect = !isAlreadyProtected && Boolean(isPrivate);
                return {
                    ...(element && {
                        element: shouldProtect ? (
                            <ProtectedRoute>{element}</ProtectedRoute>
                        ) : (
                            element
                        ),
                    }),
                    ...(children?.length && {
                        children: mapRoutes(
                            children,
                            isAlreadyProtected || shouldProtect,
                        ),
                    }),
                    path,
                };
            },
        );

    const mappedRoutes = mapRoutes(routes);
    return <LibraryRouterProvider router={createBrowserRouter(mappedRoutes)} />;
};

export { RouterProvider };
