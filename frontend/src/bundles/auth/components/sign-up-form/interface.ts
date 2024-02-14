import { type UserAuthRequestDto } from '~/bundles/users/users.js';

interface UserSignUpForm extends UserAuthRequestDto {
    passwordConfirm: string;
}

export { type UserSignUpForm };
