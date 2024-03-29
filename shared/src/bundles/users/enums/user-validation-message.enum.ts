import { MEGABYTE_PER_BYTE } from '../../../constants/constants.js';
import { UserValidationRule } from './user-validation-rule.enum.js';

const {
    LOCATION,
    PASSWORD,
    FULLNAME,
    NICKNAME,
    WEIGHT,
    HEIGHT,
    AVATAR_MAX_SIZE,
    AVATAR_ALLOWED_TYPES,
} = UserValidationRule;

const UserValidationMessage = {
    REQUIRED: 'Please fill out this field',
    INVALID: 'Please enter a valid value',
    INVALID_EMAIL: 'Please enter a valid email',
    INVALID_PASSWORD: `Password must have from ${PASSWORD.MIN_LENGTH} to ${PASSWORD.MAX_LENGTH} characters`,
    PASSWORD_MISMATCH: 'Passwords must be identical. Please try again',
    WEEK_PASSWORD:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
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
    BIRTHDATE_IN_FUTURE: 'Date of birth can not be in the future',
    WEIGHT_VALUE: `Weight should be from ${WEIGHT.MIN_VALUE} to ${WEIGHT.MAX_VALUE} kg.`,
    WEIGHT_WRONG: 'Weight should only contain numbers and a decimal point.',
    HEIGHT_WRONG: 'Height should only contain numbers and a decimal point.',
    HEIGHT_VALUE: `Height should be from ${HEIGHT.MIN_VALUE} to ${HEIGHT.MAX_VALUE} cm.`,
    LOCATION_WRONG: 'Location should be in format City, Country',
    LOCATION_LENGTH: `lOCATION should have from ${LOCATION.MIN_LENGTH} to ${LOCATION.MAX_LENGTH} characters.`,
    USER_NOT_FOUND: 'User not found',
    USER_WITH_REFERRAL_ID_NOT_FOUND: 'User with this referral id was not found',
    BONUS_OPERATION_LACK_OF_FUNDS:
        'Operation can not be finished due to lack of funds.',
    BONUS_OPERATION_NOT_SUCCESSFUL: 'Operation was not sucessfull.',
    USER_OAUTH: 'Use OAuth to sign in',
    FILE_REQUIRED: 'File is required',
    FILE_SIZE_EXCEEDED: `File size exceeded. Max file size is ${AVATAR_MAX_SIZE / MEGABYTE_PER_BYTE}MB`,
    FILE_TYPE_NOT_ALLOWED: `File type is not allowed. Only ${AVATAR_ALLOWED_TYPES.toString()} is allowed`,
} as const;

export { UserValidationMessage };
