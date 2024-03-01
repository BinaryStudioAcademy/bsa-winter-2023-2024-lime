import { type DataStatusType } from '~/bundles/common/types/types.js';
import { type UserGetAllItemResponseDto } from '~/bundles/users/users.js';

type UsersStateTypeSlice = {
    users: UserGetAllItemResponseDto[];
    dataStatus: DataStatusType;
};

export { type UsersStateTypeSlice };
