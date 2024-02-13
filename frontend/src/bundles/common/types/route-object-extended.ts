import { type RouteObject } from 'react-router-dom';

type RouteObjectExtended = RouteObject & {
    private?: boolean;
};

export { type RouteObjectExtended };
