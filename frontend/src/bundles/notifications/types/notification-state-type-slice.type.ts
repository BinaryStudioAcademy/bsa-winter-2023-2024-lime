import { type ValueOf } from 'shared';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

import { type NotificationResponseDto, type Paged } from './types.js';

type NotificationStateTypeSlice = {
    notifications: Paged<NotificationResponseDto>;
    dataStatus: ValueOf<typeof DataStatus>;
    isRefreshing: boolean;
};

export { type NotificationStateTypeSlice };
