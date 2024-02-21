type StravaOAuthResponseDto = {
    userId: number;
    tokenType: string;
    expiresIn: number;
    expiresAt: number;
    refreshToken: string;
    accessToken: string;
};

export { type StravaOAuthResponseDto };
