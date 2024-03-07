import { type  ValueOf } from 'shared';

import { type  DataStatus } from '~/bundles/common/enums/enums.js';

import { type NotificationResponseDto } from '../temp-types/types.js';

type NotificationStateTypeSlice ={
    notifications: Array<NotificationResponseDto>;
    dataStatus: ValueOf<typeof DataStatus>;
    isRefreshing: boolean;
    };

export { type NotificationStateTypeSlice };
