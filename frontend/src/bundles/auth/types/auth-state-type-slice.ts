import {
    type DataStatusType,
    type UserAuthResponseDto,
} from '~/bundles/common/types/types.js';

type AuthStateTypeSlice = {
    dataStatus: DataStatusType;
    user: UserAuthResponseDto | null;
    isRefreshing: boolean;
};

export { type AuthStateTypeSlice };
