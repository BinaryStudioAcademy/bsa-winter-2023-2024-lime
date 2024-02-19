import { type UserAuthRequestDto } from 'shared';

type UserSignUpForm = UserAuthRequestDto & {
    passwordConfirm: string;
};

export { type UserSignUpForm };
