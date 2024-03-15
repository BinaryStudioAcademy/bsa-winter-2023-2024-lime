import { type UserAuthSignInRequestDto } from './user-auth-sign-in-request-dto.type.js';

type UserAuthSignUpRequestDto = UserAuthSignInRequestDto & {
    referralCode: string | null;
};

export { type UserAuthSignUpRequestDto };
