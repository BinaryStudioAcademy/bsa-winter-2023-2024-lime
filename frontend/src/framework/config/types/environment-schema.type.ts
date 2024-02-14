import { type ValueOf } from 'shared';

import { type AppEnvironment } from '~/bundles/common/enums/enums.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    API: {
        ORIGIN_URL: string;
    };
};

export { type EnvironmentSchema };
