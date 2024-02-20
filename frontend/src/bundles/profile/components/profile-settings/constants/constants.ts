import { Gender } from '~/bundles/common/enums/enums.js';
import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

const DEFAULT_UPDATE_PROFILE_PAYLOAD: UserUpdateProfileRequestDto = {
    id: 0,
    fullname: '',
    username: '',
    dateOfBirth: '',
    weight: '',
    height: '',
    gender: Gender.OTHER,
};

export { DEFAULT_UPDATE_PROFILE_PAYLOAD };
