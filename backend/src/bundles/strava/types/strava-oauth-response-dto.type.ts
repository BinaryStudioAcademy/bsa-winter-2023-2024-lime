type Athlete = {
    id: number;
    username: string | null;
};

type StravaOAuthResponseDto = {
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    access_token: string;
    athlete: Athlete;
};

export { type StravaOAuthResponseDto };
