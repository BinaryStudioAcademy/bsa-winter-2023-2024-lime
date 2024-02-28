type StravaOAuthApiResponse = {
    user_id: number;
    scope: string;
    token_type: string;
    expires_at: number;
    refresh_token: string;
    access_token: string;
};

export { type StravaOAuthApiResponse };
