const UserValidationMessage = {
    EMAIL_REQUIRE: 'Email is required',
    EMAIL_WRONG: 'Email is wrong',
    EMAIL_ALREADY_TAKEN: 'This email is already taken',
    LOGIN_CREDENTIALS_DO_NOT_MATCH: 'Incorrect email or password',
    FULLNAME_LENGTH: 'Fullname should have from 2 to 60 characters.',
    FULLNAME_WRONG:
        'Fullname should consist of letters, special characters, spaces, emoji',
    NICKNAME_LENGTH: 'Nickname should have from 2 to 30 characters.',
    NICKNAME_WRONG:
        'Nickname should consist of letters, special characters, spaces, emoji',
    BIRTHDATE_FORMAT: 'Invalid date format. Use DD/MM/YYYY',
    WEIGHT_LENGTH: 'Weight should have from 2 to 20 characters.',
    WEIGHT_WRONG:
        'Weight should consist of digits,Latin letters, middle-placed comma, middle-placed dot',
    HEIGHT_WRONG:
        'Height should consist of digits, Latin letters, middle-placed comma, middle-placed dot.',
    HEIGHT_LENGTH: 'Height should have from 2 to 20 characters.',
} as const;

export { UserValidationMessage };
