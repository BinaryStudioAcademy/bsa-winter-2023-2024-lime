import { Gender } from '~/bundles/common/enums/enums.js';
import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

const DEFAULT_UPDATE_PROFILE_PAYLOAD: UserUpdateProfileRequestDto = {
    avatarUrl: '',
    fullName: '',
    username: '',
    dateOfBirth: '',
    weight: '',
    height: '',
    location: '',
    isPublic: false,
    gender: Gender.MALE,
};

export { DEFAULT_UPDATE_PROFILE_PAYLOAD };
