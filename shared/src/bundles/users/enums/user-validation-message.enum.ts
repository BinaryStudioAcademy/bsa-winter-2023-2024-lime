const UserValidationMessage = {
    EMAIL_REQUIRE: 'Email is required',
    EMAIL_WRONG: 'Email is wrong',
    EMAIL_ALREADY_TAKEN: 'This email is already taken',
    LOGIN_CREDENTIALS_DO_NOT_MATCH: 'Incorrect email or password',
} as const;

export { UserValidationMessage };
