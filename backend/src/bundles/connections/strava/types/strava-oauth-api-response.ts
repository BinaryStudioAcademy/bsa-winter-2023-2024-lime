type StravaOAuthApiResponse = {
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    access_token: string;
};

export { type StravaOAuthApiResponse };
