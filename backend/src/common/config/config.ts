import { logger } from '~/common/logger/logger.js';

import { Config } from './config.package.js';

const config = new Config(logger);

export { config };
export { type IConfig } from './interfaces/interfaces.js';
