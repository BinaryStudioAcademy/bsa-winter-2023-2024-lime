import { type ServerAppApi } from '~/common/server-application/types/types.js';

const createProtectedRoutes = (apis: ServerAppApi[]): string[] => {
    return apis.flatMap((api) => {
        const protectedRoutes: string[] = [];
        for (const route of api.routes) {
            if (route.isProtected) {
                protectedRoutes.push(route.path);
            }
        }
        return protectedRoutes;
    });
};

export { createProtectedRoutes };
