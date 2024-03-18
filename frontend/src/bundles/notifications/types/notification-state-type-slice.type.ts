import { type ValueOf } from 'shared';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

import { type NotificationResponseDto } from './types.js';

type NotificationStateTypeSlice = {
    notifications: {
        items: NotificationResponseDto[];
        count: number;
    };
    dataStatus: ValueOf<typeof DataStatus>;
    isRefreshing: boolean;
};

export { type NotificationStateTypeSlice };
