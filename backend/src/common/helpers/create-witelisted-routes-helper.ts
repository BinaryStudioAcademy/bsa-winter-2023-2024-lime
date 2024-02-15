import { type ServerAppApi } from '~/common/server-application/types/types.js';

import { extractApiPath } from './extract-api-path-helper.js';

const createWhitelistedRoutes = (apis: ServerAppApi[]): string[] => {
    const filteredRoutes = apis.flatMap((api) =>
        api.routes.filter((element) => !element.isPublic),
    );
    return filteredRoutes.map((item) => extractApiPath(item.path)) as string[];
};

export { createWhitelistedRoutes };
