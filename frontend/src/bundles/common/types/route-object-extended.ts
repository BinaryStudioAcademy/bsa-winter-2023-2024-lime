import { type RouteObject } from 'react-router-dom';

type RouteObjectExtended = RouteObject & {
    isPrivate?: boolean;
};

export { type RouteObjectExtended };
