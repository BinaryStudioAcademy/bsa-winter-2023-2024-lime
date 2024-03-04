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
    FULLNAME_LENGTH: 'Fullname should have from 2 to 60 characters.',
    FULLNAME_WRONG:
        'Fullname should consist of letters, special characters, spaces, emoji',
    NICKNAME_LENGTH: 'Nickname should have from 2 to 30 characters.',
    NICKNAME_WRONG:
        'Nickname should consist of letters, special characters, spaces, emoji',
    BIRTHDATE_FORMAT: 'Invalid date format. Use DD/MM/YYYY',
    WEIGHT_VALUE: 'Weight should be from 1 to 300 kg.',
    WEIGHT_WRONG: 'Weight should consist of digits.',
    HEIGHT_WRONG: 'Height should consist of digits.',
    HEIGHT_VALUE: 'Height should be from 1 to 300 sm.',
    USER_NOT_FOUND: 'User not found',
} as const;

export { UserValidationMessage };
