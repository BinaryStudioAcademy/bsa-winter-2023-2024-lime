import { STRAVA_SUBSCRIPTION_URL } from '~/bundles/strava/constants/constants.js';
import { StravaPath } from '~/bundles/strava/enums/enums.js';
import { config } from '~/common/config/config.js';
import { ApiPath, ContentType } from '~/common/enums/enums.js';

const initStravaWebhook = async (): Promise<void> => {
    const url = new URL(STRAVA_SUBSCRIPTION_URL);
    url.searchParams.append('client_id', config.ENV.STRAVA.CLIENT_ID);
    url.searchParams.append('client_secret', config.ENV.STRAVA.CLIENT_SECRET);

    const response = await fetch(url);
    const webhooks = await response.json();

    if (webhooks.length > 0) {
        return;
    }

    await fetch(STRAVA_SUBSCRIPTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify({
            client_id: config.ENV.STRAVA.CLIENT_ID,
            client_secret: config.ENV.STRAVA.CLIENT_SECRET,
            callback_url: `${config.ENV.APP.API_BASE_URL}${ApiPath.STRAVA}${StravaPath.WEBHOOK}`,
            verify_token: 'STRAVA',
        }),
    });
};

export { initStravaWebhook };
