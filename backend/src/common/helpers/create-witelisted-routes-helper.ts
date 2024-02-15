import { type ServerAppApi } from '~/common/server-application/types/types.js';

const createWhitelistedRoutes = (apis: ServerAppApi[]): string[] => {
    return apis.flatMap((api) => {
        const whitelistedRoutes: string[] = [];
        for (const route of api.routes) {
            if (route.isPublic) {
                whitelistedRoutes.push(route.path);
            }
        }
        return whitelistedRoutes;
    });
};

export { createWhitelistedRoutes };
