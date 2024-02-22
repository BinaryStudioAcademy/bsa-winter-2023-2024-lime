type StravaOAuthResponseDto = {
    userId: number;
    tokenType: string;
    expiresIn: number;
    expiresAt: number;
    refreshToken: string;
    accessToken: string;
    scope: string;
};

export { type StravaOAuthResponseDto };
