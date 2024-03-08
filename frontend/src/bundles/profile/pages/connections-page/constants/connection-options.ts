import { IconName } from '~/bundles/common/components/icon/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { OAuthProvider } from '~/bundles/profile/pages/connections-page/enums/enums.js';

const connectionOptionsData: {
    title: string;
    description: string;
    iconName: ValueOf<typeof IconName>;
    provider: ValueOf<typeof OAuthProvider>;
}[] = [
    {
        title: 'Strava',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quasi, at fuga commodi, laudantium assumenda vitae ducimus eligendi itaque reprehenderit laboriosam perspiciatis in nesciunt suscipit est sequi facere ex? Reprehenderit!',
        iconName: IconName.stravaIcon,
        provider: OAuthProvider.STRAVA,
    },
    {
        title: 'Google Fit',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quasi, at fuga commodi, laudantium assumenda vitae ducimus eligendi itaque reprehenderit laboriosam perspiciatis in nesciunt suscipit est sequi facere ex? Reprehenderit!',
        iconName: IconName.googleFitIcon,
        provider: OAuthProvider.GOOGLE_FIT,
    },
];

export { connectionOptionsData };
