import { STRAVA_URL } from './strava-url.constant.js';

const STRAVA_API_URL = `${STRAVA_URL}/api/v3`;
const STRAVA_ACTIVITIES_URL = `${STRAVA_URL}/api/v3/activities`;
const STRAVA_SUBSCRIPTION_URL = `${STRAVA_API_URL}/push_subscriptions`;

export { STRAVA_ACTIVITIES_URL, STRAVA_API_URL, STRAVA_SUBSCRIPTION_URL };
