import { UserValidationRule } from './user-validation-rule.enum.js';

const { PASSWORD, FULLNAME, NICKNAME, WEIGHT, HEIGHT } = UserValidationRule;

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
    FULLNAME_LENGTH: `Fullname should have from ${FULLNAME.MIN_LENGTH}  to ${FULLNAME.MAX_LENGTH} characters.`,
    FULLNAME_WRONG:
        'Fullname should consist of letters, special characters, spaces, emoji',
    NICKNAME_LENGTH: `Nickname should have from ${NICKNAME.MIN_LENGTH} to ${NICKNAME.MAX_LENGTH} characters.`,
    NICKNAME_WRONG:
        'Nickname should consist of letters, special characters, spaces, emoji',
    BIRTHDATE_FORMAT: 'Invalid date format. Use DD/MM/YYYY',
    WEIGHT_VALUE: `Weight should be from ${WEIGHT.MIN_VALUE} to ${WEIGHT.MAX_VALUE} kg.`,
    WEIGHT_WRONG: 'Weight should only contain numbers and a decimal point.',
    HEIGHT_WRONG: 'Height should only contain numbers and a decimal point.',
    HEIGHT_VALUE: `Height should be from ${HEIGHT.MIN_VALUE} to ${HEIGHT.MIN_VALUE} sm.`,
    USER_NOT_FOUND: 'User not found',
} as const;

export { UserValidationMessage };
