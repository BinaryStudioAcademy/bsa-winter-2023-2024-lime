/*
  Google Fit does not provide expires_at field, 
  but it can be calculated like this:

  expires_at = expires_in + issued_at
*/

type ConnectionsOAuthResponseDto = {
    id: number;
    userId: number;
    tokenType: string;
    expiresIn: number;
    expiresAt: number;
    refreshToken: string;
    accessToken: string;
};

export { type ConnectionsOAuthResponseDto };
