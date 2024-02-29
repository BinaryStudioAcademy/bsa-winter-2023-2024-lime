import { type ServerAppRouteParameters } from './types.js';

interface ServerAppApi {
    version: string;
    routes: ServerAppRouteParameters[];
    generateDoc(): object;
    buildFullPath(path: string): string;
}

export { type ServerAppApi };
