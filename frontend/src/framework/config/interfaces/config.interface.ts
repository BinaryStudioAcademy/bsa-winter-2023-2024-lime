import { type IConfig as ILibraryConfig } from 'shared/build/index.js';

import { type EnvironmentSchema } from '../types/types.js';

interface IConfig extends ILibraryConfig<EnvironmentSchema> {}

export { type IConfig };
