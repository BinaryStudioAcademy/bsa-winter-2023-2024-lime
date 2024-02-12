import { type Knex } from 'knex';
import { type ValueOf } from 'shared';

import { type AppEnvironment } from '~/common/enums/enums.js';

type Database = {
    connect: () => void;
    environmentsConfig: Record<ValueOf<AppEnvironment>, Knex.Config>;
};

export { type Database };
