import { oAuthService } from '~/bundles/oauth/oauth.js';
import { logger } from '~/common/logger/logger.js';

import { ConnectionController } from './connection.controller.js';

const connectionController = new ConnectionController(logger, oAuthService);

export { connectionController };
