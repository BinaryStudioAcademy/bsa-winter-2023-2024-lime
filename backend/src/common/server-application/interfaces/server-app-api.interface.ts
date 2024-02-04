import { type ServerAppRouteParameters } from '../types/types.js';

interface IServerAppApi {
    version: string;
    routes: ServerAppRouteParameters[];
    generateDoc(): object;
}

export { type IServerAppApi };
