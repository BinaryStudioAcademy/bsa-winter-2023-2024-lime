import { STRAVA_API_URL, STRAVA_URL } from '../constants/constants.js';

const StravaPath = {
    AUTHORIZE: `${STRAVA_URL}/oauth/authorize`,
    TOKEN: `${STRAVA_URL}/oauth/token`,
    REFRESH_TOKEN: `${STRAVA_API_URL}/oauth/token`,
    DEAUTHRORIZE: `${STRAVA_URL}/oauth/deauthorize`,
    WEBHOOK: '/webhook',
} as const;

export { StravaPath };
