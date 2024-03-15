import { type ValueOf } from '~/bundles/common/types/types.js';

import { type Status } from '../enums/status.enum.js';

type ChatLink = {
    id: number;
    status: ValueOf<typeof Status>;
    lastMessage: string;
    username: string;
};

export { type ChatLink };
