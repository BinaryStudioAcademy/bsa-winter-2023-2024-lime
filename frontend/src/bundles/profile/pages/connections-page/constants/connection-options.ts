import { IconName } from '~/bundles/common/components/icon/enums/enums.js';
import { OAuthProvider } from '~/bundles/profile/pages/connections-page/enums/enums.js';

import { type ConnectionOption } from '../types/types.js';

const connectionOptionsData: ConnectionOption[] = [
    {
        title: 'Strava',
        description:
            'Connect your Strava account to LIME so that your activity data, including workout distance, active calories, heart rate is synced with Strava.',
        logoIcon: IconName.stravaIcon,
        provider: OAuthProvider.STRAVA,
        buttonIcon: 'stavaButtonIcon',
    },
    {
        title: 'Google Fit',
        description:
            'Connect your Google Fit account to LIME so that your activity data, including workout distance, active calories, heart rate is synced with Google Fit.',
        logoIcon: IconName.googleFitIcon,
        provider: OAuthProvider.GOOGLE_FIT,
    },
];

export { connectionOptionsData };
