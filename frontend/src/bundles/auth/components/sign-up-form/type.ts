import { type UserAuthSignInRequestDto } from 'shared';

type UserSignUpForm = UserAuthSignInRequestDto & {
    passwordConfirm: string;
};

export { type UserSignUpForm };
