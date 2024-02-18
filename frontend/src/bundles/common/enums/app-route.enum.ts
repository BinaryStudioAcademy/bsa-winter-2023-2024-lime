const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    PASSWORD_RESET: '/reset-password/:userId/:resetToken',
    NOT_FOUND: '*',
} as const;

export { AppRoute };
