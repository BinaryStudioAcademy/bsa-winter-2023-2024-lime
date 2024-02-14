import { type RouteObject as LibraryRouteObject } from 'react-router-dom';

type RouteObject = LibraryRouteObject & {
    isPrivate?: boolean;
};

export { type RouteObject };
