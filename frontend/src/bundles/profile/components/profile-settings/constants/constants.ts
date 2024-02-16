import { type UserUpdateProfileRequestDto } from '~/bundles/users/users.js';

const DEFAULT_UPDATE_PROFILE_PAYLOAD: UserUpdateProfileRequestDto = {
    fullname: '',
    nickname: '',
    birthdate: '',
    weight: '',
    height: '',
    gender: '',
};

export { DEFAULT_UPDATE_PROFILE_PAYLOAD };
