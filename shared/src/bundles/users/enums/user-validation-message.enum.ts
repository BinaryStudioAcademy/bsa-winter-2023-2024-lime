import { UserValidationRule } from './user-validation-rule.enum.js';

const { PASSWORD } = UserValidationRule;

const UserValidationMessage = {
    REQUIRED: 'Please fill out this field',
    INVALID_EMAIL: 'Please enter a valid email',
    INVALID_PASSWORD: `Password must have from ${PASSWORD.MIN_LENGTH} to ${PASSWORD.MAX_LENGTH} characters`,
    PASSWORD_MISMATCH: 'Passwords must be identical. Please try again',
    EMAIL_ALREADY_TAKEN:
        'User with this email already exists. Log in if it is you',
    LOGIN_CREDENTIALS_DO_NOT_MATCH: 'Incorrect email or password',
    TOKEN_REQUIRE: 'Token is required',
    TOKEN_INVALID: 'Invalid token',
} as const;

export { UserValidationMessage };
