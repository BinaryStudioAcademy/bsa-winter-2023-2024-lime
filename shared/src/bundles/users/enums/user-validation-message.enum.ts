enum UserValidationMessage {
    EMAIL_REQUIRE = 'Please fill out this field',
    INVALID_EMAIL = 'Please enter a valid email',
    INVALID_PASSWORD = 'Password must have from 6 to 12 characters',
    PASSWORD_MISMATCH = 'Passwords must be identical. Please try again',
    LOGIN_CREDENTIALS_DO_NOT_MATCH = 'Incorrect email or password',
    EMAIL_ALREADY_TAKEN = 'User with this email already exists. Log in if it is you',
}

export { UserValidationMessage };
