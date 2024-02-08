import { type Knex } from 'knex';

import { type AppEnvironment } from '~/common/enums/enums.js';

type Database = {
    connect: () => void;
    environmentsConfig: Record<AppEnvironment, Knex.Config>;
};

export { type Database };
