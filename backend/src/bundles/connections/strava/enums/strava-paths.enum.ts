const STRAVA_URL = 'https://www.strava.com';
const STRAVA_API_URL = `${STRAVA_URL}/api/v3`;

const StravaPaths = {
    AUTHORIZE: `${STRAVA_URL}/oauth/authorize`,
    TOKEN_EXCHANGE: `${STRAVA_URL}/oauth/token`,
    REFRESH_TOKEN: `${STRAVA_API_URL}/oauth/token`,
    DEAUTHRORIZE: `${STRAVA_URL}/oauth/deauthorize`,
    REDIRECT_URI: '/exchange-token',
} as const;

export { StravaPaths };
