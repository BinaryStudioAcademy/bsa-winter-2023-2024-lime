import { type UserAuthResponseDto } from '~/bundles/users/users.js';

type AuthResponseDto = {
    user: UserAuthResponseDto;
    token: string;
};

export { type AuthResponseDto };
