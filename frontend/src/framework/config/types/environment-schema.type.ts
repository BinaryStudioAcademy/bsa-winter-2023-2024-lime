import { type AppEnvironment } from '~/bundles/common/enums/enums.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: AppEnvironment;
    };
    API: {
        ORIGIN_URL: string;
    };
};

export { type EnvironmentSchema };
