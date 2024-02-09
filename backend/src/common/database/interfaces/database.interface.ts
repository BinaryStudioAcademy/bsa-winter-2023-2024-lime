import { type Knex } from 'knex';

import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

interface IDatabase {
    connect: () => void;
    environmentsConfig: Record<ValueOf<typeof AppEnvironment>, Knex.Config>;
}

export { type IDatabase };
