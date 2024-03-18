import { type IconName } from '~/bundles/common/components/icon/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type OAuthProvider } from '../enums/enums.js';

type ConnectionOption = {
    title: string;
    description: string;
    logoIcon: ValueOf<typeof IconName>;
    provider: ValueOf<typeof OAuthProvider>;
    buttonIcon?: ValueOf<typeof IconName> | null;
};

export { type ConnectionOption };
