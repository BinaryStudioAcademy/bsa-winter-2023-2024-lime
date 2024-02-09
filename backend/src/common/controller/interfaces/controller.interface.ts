import { type ServerAppRouteParameters } from '~/common/server-application/server-application.js';

import { type ControllerRouteParameters } from '../types/types.js';

interface IController {
    routes: ServerAppRouteParameters[];
    addRoute(options: ControllerRouteParameters): void;
}

export { type IController };
